
const { getDB } = require('../config/database');
const Course = require('../models/Course');

const courseController = {
  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const db = getDB();
      const { page = 1, limit = 10, level, isActive } = req.query;
      
      let query = 'SELECT * FROM courses WHERE 1=1';
      const queryParams = [];
      let paramCount = 0;
      
      if (level) {
        paramCount++;
        query += ` AND level = $${paramCount}`;
        queryParams.push(level);
      }
      
      if (isActive !== undefined) {
        paramCount++;
        query += ` AND is_active = $${paramCount}`;
        queryParams.push(isActive === 'true');
      }
      
      query += ' ORDER BY created_at DESC';
      
      const offset = (page - 1) * limit;
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      queryParams.push(parseInt(limit));
      
      paramCount++;
      query += ` OFFSET $${paramCount}`;
      queryParams.push(offset);
      
      const result = await db.query(query, queryParams);
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) FROM courses WHERE 1=1';
      const countParams = [];
      let countParamCount = 0;
      
      if (level) {
        countParamCount++;
        countQuery += ` AND level = $${countParamCount}`;
        countParams.push(level);
      }
      
      if (isActive !== undefined) {
        countParamCount++;
        countQuery += ` AND is_active = $${countParamCount}`;
        countParams.push(isActive === 'true');
      }
      
      const countResult = await db.query(countQuery, countParams);
      const total = parseInt(countResult.rows[0].count);
      
      res.json({
        success: true,
        data: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero dei corsi',
        error: error.message
      });
    }
  },

  // Get course by ID
  getCourseById: async (req, res) => {
    try {
      const db = getDB();
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID corso non valido'
        });
      }
      
      const result = await db.query('SELECT * FROM courses WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Corso non trovato'
        });
      }
      
      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero del corso',
        error: error.message
      });
    }
  },

  // Create new course
  createCourse: async (req, res) => {
    try {
      const db = getDB();
      
      // Validate course data
      const validationErrors = Course.validate(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Dati non validi',
          errors: validationErrors
        });
      }
      
      // Check if course with same name already exists
      const existingCourse = await db.query(
        'SELECT id FROM courses WHERE name = $1',
        [req.body.name.trim()]
      );
      
      if (existingCourse.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Esiste già un corso con questo nome'
        });
      }
      
      const course = new Course(req.body);
      const courseData = course.toJSON();
      
      const result = await db.query(`
        INSERT INTO courses (name, description, instructor, time, location, max_participants, price, image_url, level, duration, start_date, end_date, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
      `, [
        courseData.name,
        courseData.description,
        courseData.instructor,
        courseData.time,
        courseData.location,
        courseData.max_participants,
        courseData.price,
        courseData.image_url,
        courseData.level,
        courseData.duration,
        courseData.start_date,
        courseData.end_date,
        courseData.is_active
      ]);
      
      res.status(201).json({
        success: true,
        message: 'Corso creato con successo',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nella creazione del corso',
        error: error.message
      });
    }
  },

  // Update course
  updateCourse: async (req, res) => {
    try {
      const db = getDB();
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID corso non valido'
        });
      }
      
      // Validate course data
      const validationErrors = Course.validate(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Dati non validi',
          errors: validationErrors
        });
      }
      
      // Check if course exists
      const existingCourse = await db.query('SELECT id FROM courses WHERE id = $1', [id]);
      if (existingCourse.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Corso non trovato'
        });
      }
      
      // Check if another course with same name exists (excluding current course)
      const duplicateCourse = await db.query(
        'SELECT id FROM courses WHERE name = $1 AND id != $2',
        [req.body.name.trim(), id]
      );
      
      if (duplicateCourse.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Esiste già un corso con questo nome'
        });
      }
      
      const course = new Course(req.body);
      const courseData = course.toJSON();
      
      const result = await db.query(`
        UPDATE courses 
        SET name = $1, description = $2, instructor = $3, time = $4, location = $5, 
            max_participants = $6, price = $7, image_url = $8, level = $9, 
            duration = $10, start_date = $11, end_date = $12, is_active = $13, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $14
        RETURNING *
      `, [
        courseData.name,
        courseData.description,
        courseData.instructor,
        courseData.time,
        courseData.location,
        courseData.max_participants,
        courseData.price,
        courseData.image_url,
        courseData.level,
        courseData.duration,
        courseData.start_date,
        courseData.end_date,
        courseData.is_active,
        id
      ]);
      
      res.json({
        success: true,
        message: 'Corso aggiornato con successo',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nell\'aggiornamento del corso',
        error: error.message
      });
    }
  },

  // Delete course
  deleteCourse: async (req, res) => {
    try {
      const db = getDB();
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID corso non valido'
        });
      }
      
      // Check if course has active subscriptions
      const activeSubscriptions = await db.query(
        'SELECT COUNT(*) FROM course_subscriptions WHERE course_id = $1 AND status != $2',
        [id, 'cancelled']
      );
      
      const count = parseInt(activeSubscriptions.rows[0].count);
      if (count > 0) {
        return res.status(409).json({
          success: false,
          message: `Non è possibile eliminare il corso. Ci sono ${count} iscrizioni attive.`
        });
      }
      
      const result = await db.query('DELETE FROM courses WHERE id = $1', [id]);
      
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Corso non trovato'
        });
      }
      
      res.json({
        success: true,
        message: 'Corso eliminato con successo'
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nell\'eliminazione del corso',
        error: error.message
      });
    }
  }
};

module.exports = courseController;

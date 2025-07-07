
const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');
const Course = require('../models/Course');

const courseController = {
  // Get all courses
  getAllCourses: async (req, res) => {
    try {
      const db = getDB();
      const { page = 1, limit = 10, level, isActive } = req.query;
      
      const filter = {};
      if (level) filter.level = level;
      if (isActive !== undefined) filter.isActive = isActive === 'true';
      
      const skip = (page - 1) * limit;
      
      const courses = await db.collection('courses')
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();
      
      const total = await db.collection('courses').countDocuments(filter);
      
      res.json({
        success: true,
        data: courses,
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
      
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID corso non valido'
        });
      }
      
      const course = await db.collection('courses').findOne({ _id: new ObjectId(id) });
      
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Corso non trovato'
        });
      }
      
      res.json({
        success: true,
        data: course
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
      const existingCourse = await db.collection('courses').findOne({ 
        name: req.body.name.trim() 
      });
      
      if (existingCourse) {
        return res.status(409).json({
          success: false,
          message: 'Esiste già un corso con questo nome'
        });
      }
      
      const course = new Course(req.body);
      const result = await db.collection('courses').insertOne(course.toJSON());
      
      res.status(201).json({
        success: true,
        message: 'Corso creato con successo',
        data: { _id: result.insertedId, ...course.toJSON() }
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
      
      if (!ObjectId.isValid(id)) {
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
      const existingCourse = await db.collection('courses').findOne({ _id: new ObjectId(id) });
      if (!existingCourse) {
        return res.status(404).json({
          success: false,
          message: 'Corso non trovato'
        });
      }
      
      // Check if another course with same name exists (excluding current course)
      const duplicateCourse = await db.collection('courses').findOne({ 
        name: req.body.name.trim(),
        _id: { $ne: new ObjectId(id) }
      });
      
      if (duplicateCourse) {
        return res.status(409).json({
          success: false,
          message: 'Esiste già un corso con questo nome'
        });
      }
      
      const updateData = {
        ...req.body,
        updatedAt: new Date()
      };
      
      const result = await db.collection('courses').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      
      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Corso non trovato'
        });
      }
      
      const updatedCourse = await db.collection('courses').findOne({ _id: new ObjectId(id) });
      
      res.json({
        success: true,
        message: 'Corso aggiornato con successo',
        data: updatedCourse
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
      
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID corso non valido'
        });
      }
      
      // Check if course has active subscriptions
      const activeSubscriptions = await db.collection('courseSubscriptions').countDocuments({
        courseId: new ObjectId(id),
        status: { $ne: 'cancelled' }
      });
      
      if (activeSubscriptions > 0) {
        return res.status(409).json({
          success: false,
          message: `Non è possibile eliminare il corso. Ci sono ${activeSubscriptions} iscrizioni attive.`
        });
      }
      
      const result = await db.collection('courses').deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
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

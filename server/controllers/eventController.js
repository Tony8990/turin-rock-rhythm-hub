
const { getDB } = require('../config/database');
const Event = require('../models/Event');

const eventController = {
  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const db = getDB();
      const { page = 1, limit = 10, category, isActive, upcoming } = req.query;
      
      let query = 'SELECT * FROM events WHERE 1=1';
      const queryParams = [];
      let paramCount = 0;
      
      if (category) {
        paramCount++;
        query += ` AND category = $${paramCount}`;
        queryParams.push(category);
      }
      
      if (isActive !== undefined) {
        paramCount++;
        query += ` AND is_active = $${paramCount}`;
        queryParams.push(isActive === 'true');
      }
      
      if (upcoming === 'true') {
        paramCount++;
        query += ` AND date >= $${paramCount}`;
        queryParams.push(new Date());
      }
      
      query += ' ORDER BY date ASC';
      
      const offset = (page - 1) * limit;
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      queryParams.push(parseInt(limit));
      
      paramCount++;
      query += ` OFFSET $${paramCount}`;
      queryParams.push(offset);
      
      const result = await db.query(query, queryParams);
      
      // Get total count
      let countQuery = 'SELECT COUNT(*) FROM events WHERE 1=1';
      const countParams = [];
      let countParamCount = 0;
      
      if (category) {
        countParamCount++;
        countQuery += ` AND category = $${countParamCount}`;
        countParams.push(category);
      }
      
      if (isActive !== undefined) {
        countParamCount++;
        countQuery += ` AND is_active = $${countParamCount}`;
        countParams.push(isActive === 'true');
      }
      
      if (upcoming === 'true') {
        countParamCount++;
        countQuery += ` AND date >= $${countParamCount}`;
        countParams.push(new Date());
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
      console.error('Error fetching events:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero degli eventi',
        error: error.message
      });
    }
  },

  // Get event by ID
  getEventById: async (req, res) => {
    try {
      const db = getDB();
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID evento non valido'
        });
      }
      
      const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Evento non trovato'
        });
      }
      
      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nel recupero dell\'evento',
        error: error.message
      });
    }
  },

  // Create new event
  createEvent: async (req, res) => {
    try {
      const db = getDB();
      
      // Validate event data
      const validationErrors = Event.validate(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Dati non validi',
          errors: validationErrors
        });
      }
      
      const event = new Event(req.body);
      const eventData = event.toJSON();
      
      const result = await db.query(`
        INSERT INTO events (name, description, date, venue, ticket_price, image_url, max_attendees, category, organizer, contact_info, is_active, is_featured)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `, [
        eventData.name,
        eventData.description,
        eventData.date,
        eventData.venue,
        eventData.ticket_price,
        eventData.image_url,
        eventData.max_attendees,
        eventData.category,
        eventData.organizer,
        eventData.contact_info,
        eventData.is_active,
        eventData.is_featured
      ]);
      
      res.status(201).json({
        success: true,
        message: 'Evento creato con successo',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nella creazione dell\'evento',
        error: error.message
      });
    }
  },

  // Update event
  updateEvent: async (req, res) => {
    try {
      const db = getDB();
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID evento non valido'
        });
      }
      
      // Validate event data
      const validationErrors = Event.validate(req.body);
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Dati non validi',
          errors: validationErrors
        });
      }
      
      const event = new Event(req.body);
      const eventData = event.toJSON();
      
      const result = await db.query(`
        UPDATE events 
        SET name = $1, description = $2, date = $3, venue = $4, ticket_price = $5, 
            image_url = $6, max_attendees = $7, category = $8, organizer = $9, 
            contact_info = $10, is_active = $11, is_featured = $12, updated_at = CURRENT_TIMESTAMP
        WHERE id = $13
        RETURNING *
      `, [
        eventData.name,
        eventData.description,
        eventData.date,
        eventData.venue,
        eventData.ticket_price,
        eventData.image_url,
        eventData.max_attendees,
        eventData.category,
        eventData.organizer,
        eventData.contact_info,
        eventData.is_active,
        eventData.is_featured,
        id
      ]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Evento non trovato'
        });
      }
      
      res.json({
        success: true,
        message: 'Evento aggiornato con successo',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nell\'aggiornamento dell\'evento',
        error: error.message
      });
    }
  },

  // Delete event
  deleteEvent: async (req, res) => {
    try {
      const db = getDB();
      const { id } = req.params;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID evento non valido'
        });
      }
      
      const result = await db.query('DELETE FROM events WHERE id = $1', [id]);
      
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Evento non trovato'
        });
      }
      
      res.json({
        success: true,
        message: 'Evento eliminato con successo'
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({
        success: false,
        message: 'Errore nell\'eliminazione dell\'evento',
        error: error.message
      });
    }
  }
};

module.exports = eventController;

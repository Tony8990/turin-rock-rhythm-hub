
const { getDB } = require('../config/database');
const { ObjectId } = require('mongodb');
const Event = require('../models/Event');

const eventController = {
  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const db = getDB();
      const { page = 1, limit = 10, category, isActive, upcoming } = req.query;
      
      const filter = {};
      if (category) filter.category = category;
      if (isActive !== undefined) filter.isActive = isActive === 'true';
      if (upcoming === 'true') filter.date = { $gte: new Date() };
      
      const skip = (page - 1) * limit;
      
      const events = await db.collection('events')
        .find(filter)
        .sort({ date: 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();
      
      const total = await db.collection('events').countDocuments(filter);
      
      res.json({
        success: true,
        data: events,
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
      
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID evento non valido'
        });
      }
      
      const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
      
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Evento non trovato'
        });
      }
      
      res.json({
        success: true,
        data: event
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
      const result = await db.collection('events').insertOne(event.toJSON());
      
      res.status(201).json({
        success: true,
        message: 'Evento creato con successo',
        data: { _id: result.insertedId, ...event.toJSON() }
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
      
      if (!ObjectId.isValid(id)) {
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
      
      const updateData = {
        ...req.body,
        date: new Date(req.body.date),
        updatedAt: new Date()
      };
      
      const result = await db.collection('events').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      
      if (result.matchedCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'Evento non trovato'
        });
      }
      
      const updatedEvent = await db.collection('events').findOne({ _id: new ObjectId(id) });
      
      res.json({
        success: true,
        message: 'Evento aggiornato con successo',
        data: updatedEvent
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
      
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID evento non valido'
        });
      }
      
      const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
      
      if (result.deletedCount === 0) {
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

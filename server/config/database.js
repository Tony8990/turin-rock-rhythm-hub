
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rock_turin_dance';
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    db = client.db('rock_turin_dance');
    
    // Create indexes for better performance
    await createIndexes();
    
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // Courses collection indexes
    await db.collection('courses').createIndex({ name: 1 });
    await db.collection('courses').createIndex({ instructor: 1 });
    await db.collection('courses').createIndex({ createdAt: -1 });
    
    // Events collection indexes
    await db.collection('events').createIndex({ name: 1 });
    await db.collection('events').createIndex({ date: 1 });
    await db.collection('events').createIndex({ venue: 1 });
    await db.collection('events').createIndex({ createdAt: -1 });
    
    // Course subscriptions indexes
    await db.collection('courseSubscriptions').createIndex({ courseId: 1 });
    await db.collection('courseSubscriptions').createIndex({ participantEmail: 1 });
    await db.collection('courseSubscriptions').createIndex({ registrationDate: -1 });
    
    // Newsletter subscribers indexes
    await db.collection('newsletterSubscribers').createIndex({ email: 1 }, { unique: true });
    await db.collection('newsletterSubscribers').createIndex({ subscribedAt: -1 });
    
    // Media collection indexes
    await db.collection('media').createIndex({ type: 1 });
    await db.collection('media').createIndex({ category: 1 });
    await db.collection('media').createIndex({ uploadDate: -1 });
    
    console.log('✅ Database indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

const closeDB = async () => {
  try {
    await client.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
};

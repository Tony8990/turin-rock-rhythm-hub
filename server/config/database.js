
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://dance_admin:tony@localhost:5432/rock_turin_dance',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL');
    
    // Test the connection
    const result = await client.query('SELECT NOW()');
    console.log('📅 Database time:', result.rows[0].now);
    
    client.release();
    
    // Create tables if they don't exist
    await createTables();
    
    return pool;
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    process.exit(1);
  }
};

const createTables = async () => {
  try {
    // Create courses table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        instructor VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        max_participants INTEGER DEFAULT 20,
        price DECIMAL(10,2),
        image_url TEXT,
        level VARCHAR(50) DEFAULT 'beginner',
        duration INTEGER,
        start_date DATE,
        end_date DATE,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date TIMESTAMP NOT NULL,
        venue VARCHAR(255) NOT NULL,
        ticket_price DECIMAL(10,2),
        image_url TEXT,
        max_attendees INTEGER,
        category VARCHAR(50) DEFAULT 'rockabilly',
        organizer VARCHAR(255),
        contact_info VARCHAR(255),
        is_active BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create course subscriptions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS course_subscriptions (
        id SERIAL PRIMARY KEY,
        course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
        participant_name VARCHAR(255) NOT NULL,
        participant_email VARCHAR(255) NOT NULL,
        participant_phone VARCHAR(50),
        experience_level VARCHAR(50) DEFAULT 'beginner',
        special_requests TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create newsletter subscribers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      )
    `);

    // Create media table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        type VARCHAR(50) NOT NULL,
        category VARCHAR(50),
        thumbnail TEXT,
        full_image_url TEXT,
        video_url TEXT,
        upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await pool.query('CREATE INDEX IF NOT EXISTS idx_courses_name ON courses(name)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_events_name ON events(name)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_events_date ON events(date)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_course_subscriptions_course_id ON course_subscriptions(course_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_course_subscriptions_email ON course_subscriptions(participant_email)');

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
};

const getDB = () => {
  return pool;
};

const closeDB = async () => {
  try {
    await pool.end();
    console.log('✅ PostgreSQL connection closed');
  } catch (error) {
    console.error('❌ Error closing PostgreSQL connection:', error);
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB
};

import pkg from 'pg'
const { Pool } = pkg

let pool = null

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    })

    // Test the connection
    const client = await pool.connect()
    console.log(`✅ PostgreSQL Connected successfully`)
    client.release()

    // Initialize database tables
    await initializeTables()
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error.message)
    process.exit(1)
  }
}

const initializeTables = async () => {
  try {
    // Create spinfiles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS spinfiles (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        json_content JSONB NOT NULL DEFAULT '[]'::jsonb,
        picture TEXT,
        ticket_number VARCHAR(255) DEFAULT '',
        active BOOLEAN DEFAULT true,
        fixed_winner_ticket VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create passwords table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS passwords (
        id SERIAL PRIMARY KEY,
        hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create index on spinfiles for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_spinfiles_active ON spinfiles(active)
    `)

    console.log('✅ Database tables initialized')
  } catch (error) {
    console.error('❌ Error initializing tables:', error.message)
    throw error
  }
}

export { pool }
export default connectDB


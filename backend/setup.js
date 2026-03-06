const db = require('./db');

const createTables = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(10) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone VARCHAR(15),
      city VARCHAR(50),
      joined_date DATE,
      status VARCHAR(10) DEFAULT 'Active'
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      id VARCHAR(10) PRIMARY KEY,
      customer_id VARCHAR(10),
      type VARCHAR(10) NOT NULL,
      make VARCHAR(50),
      model VARCHAR(50),
      year INT,
      reg_no VARCHAR(20) UNIQUE,
      color VARCHAR(30),
      fuel_type VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS policies (
      id VARCHAR(10) PRIMARY KEY,
      customer_id VARCHAR(10),
      vehicle_id VARCHAR(10),
      type VARCHAR(50),
      premium DECIMAL(10,2),
      cover_amount DECIMAL(12,2),
      start_date DATE,
      end_date DATE,
      status VARCHAR(20) DEFAULT 'Active',
      insurer VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS claims (
      id VARCHAR(10) PRIMARY KEY,
      policy_id VARCHAR(10),
      customer_id VARCHAR(10),
      claim_date DATE,
      type VARCHAR(30),
      description TEXT,
      amount DECIMAL(10,2),
      settled_amount DECIMAL(10,2) DEFAULT 0,
      status VARCHAR(20) DEFAULT 'Pending'
    );
  `);
  console.log('✅ Tables created!');
  process.exit();
};

createTables();

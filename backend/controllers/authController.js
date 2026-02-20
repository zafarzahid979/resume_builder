import pool from '../config/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    let connection;
    try {
      console.log('Attempting to get database connection...');
      connection = await pool.getConnection();
      console.log('✅ Database connection established');
    } catch (connError) {
      console.error('❌ Database connection error:', connError);
      console.error('Error code:', connError.code);
      console.error('Error message:', connError.message);
      console.error('SQL State:', connError.sqlState);
      return res.status(500).json({ 
        message: 'Database connection failed',
        details: connError.message 
      });
    }

    try {
      const result = await connection.execute(
        'INSERT INTO users (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)',
        [email, hashedPassword, firstName, lastName]
      );
      console.log('✅ User inserted successfully');
    } catch (queryError) {
      console.error('❌ Query execution error:', queryError.message);
      console.error('Error code:', queryError.code);
      throw queryError;
    } finally {
      connection.release();
    }

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('❌ Signup error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ 
      message: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    let connection;
    try {
      connection = await pool.getConnection();
      console.log('Database connection established for login');
    } catch (connError) {
      console.error('Database connection error:', connError.message);
      return res.status(500).json({ 
        message: 'Database connection failed',
        details: connError.message 
      });
    }

    let rows;
    try {
      [rows] = await connection.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      console.log('User lookup completed');
    } catch (queryError) {
      console.error('Query execution error:', queryError.message);
      throw queryError;
    } finally {
      connection.release();
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

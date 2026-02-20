import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('=== Database Connection Test ===\n');
console.log('Environment Variables:');
console.log('DB_HOST:', process.env.DB_HOST || 'localhost');
console.log('DB_USER:', process.env.DB_USER || 'root');
console.log('DB_NAME:', process.env.DB_NAME || 'resume_builder');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '(set)' : '(empty/not set)');
console.log('\n');

const testConnection = async () => {
  try {
    console.log('Attempting to connect to MySQL...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'resume_builder',
    });

    console.log('✅ Successfully connected to MySQL!');

    // Test query
    try {
      const [result] = await connection.execute('SELECT 1');
      console.log('✅ Query executed successfully');
    } catch (err) {
      console.log('❌ Query failed:', err.message);
    }

    // Check tables
    try {
      const [tables] = await connection.execute('SHOW TABLES');
      console.log('✅ Tables in database:');
      tables.forEach(table => {
        console.log('  -', Object.values(table)[0]);
      });
    } catch (err) {
      console.log('❌ Failed to list tables:', err.message);
    }

    await connection.end();
    console.log('\n✅ Connection test completed successfully!');
  } catch (error) {
    console.log('❌ Connection failed!');
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    console.log('SQL State:', error.sqlState);
    console.log('\nPossible solutions:');
    console.log('1. Ensure MySQL is running (start it in XAMPP Control Panel)');
    console.log('2. Verify .env file has correct database credentials');
    console.log('3. Check that database "resume_builder" exists');
    console.log('4. Try connecting with phpMyAdmin first: http://localhost/phpmyadmin');
  }
};

testConnection();

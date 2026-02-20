import mysql from 'mysql2/promise';

console.log('=== Testing Multiple MySQL Credentials ===\n');

const credentials = [
  { user: 'root', password: '' },
  { user: 'root', password: 'root' },
  { user: 'admin', password: 'admin' },
  { user: 'pma', password: 'pmapass' },
];

const testCredentials = async () => {
  for (const cred of credentials) {
    console.log(`\nTrying: user="${cred.user}", password="${cred.password}"`);
    try {
      const connection = await mysql.createConnection({
        host: 'localhost',
        user: cred.user,
        password: cred.password,
      });

      console.log(`✅ SUCCESS with user="${cred.user}", password="${cred.password}"`);
      
      // List databases
      const [databases] = await connection.execute('SHOW DATABASES');
      console.log('Databases:');
      databases.forEach(db => {
        console.log('  -', Object.values(db)[0]);
      });

      await connection.end();
      return; // Exit on first success
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    }
  }

  console.log('\n⚠️ All credentials failed! Please check your XAMPP MySQL setup.');
};

testCredentials();

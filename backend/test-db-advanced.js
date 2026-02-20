import mysql from 'mysql2/promise';

console.log('=== Advanced MySQL Connection Test ===\n');

const testSocketConnection = async () => {
  const configs = [
    // Try socket connection
    {
      name: 'Socket connection (pma user)',
      config: {
        socketPath: 'C:\\xampp\\mysql\\mysql.sock',
        user: 'pma',
        password: '',
      }
    },
    {
      name: 'Socket connection (root user)',
      config: {
        socketPath: 'C:\\xampp\\mysql\\mysql.sock',
        user: 'root',
        password: '',
      }
    },
    // Try localhost with different ports
    {
      name: 'Port 3306 with localhost',
      config: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
      }
    },
    {
      name: 'Port 3307 with localhost',
      config: {
        host: '127.0.0.1',
        port: 3307,
        user: 'root',
        password: '',
      }
    },
  ];

  for (const test of configs) {
    console.log(`\nTrying: ${test.name}`);
    console.log('Config:', JSON.stringify(test.config, null, 2));
    try {
      const connection = await mysql.createConnection(test.config);
      console.log(`✅ SUCCESS!`);
      
      const [databases] = await connection.execute('SHOW DATABASES');
      console.log('Databases available:');
      databases.forEach(db => {
        const dbName = Object.values(db)[0];
        console.log('  -', dbName);
      });

      // Check users
      try {
        const [users] = await connection.execute('SELECT user, host FROM mysql.user');
        console.log('\nMySQL Users:');
        users.forEach(u => {
          console.log(`  - ${u.user}@${u.host}`);
        });
      } catch (e) {
        console.log('Could not list users:', e.message);
      }

      await connection.end();
      return;
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    }
  }

  console.log('\n⚠️ Could not connect with any method.');
  console.log('\nTroubleshooting:');
  console.log('1. Check if MySQL is running: Open XAMPP Control Panel');
  console.log('2. Check XAMPP config: Look in C:\\xampp\\mysql\\bin\\my.ini');
  console.log('3. Find the [mysqld] section and note the port number');
  console.log('4. Run: mysql -h 127.0.0.1 -u root');
};

testSocketConnection();

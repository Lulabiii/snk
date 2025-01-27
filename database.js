const mysql = require('mysql2/promise');

// Créez un pool de connexions
const pool = mysql.createPool({
    host: 'db-par-02.apollopanel.com',
    user: 'u135973_JQqYAAgWfP',
    password: 'i+DjcII@b^ejmry!PpxvT31S',
    database: 's135973_bl_rp',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

module.exports = pool;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../database/gantt.db');


// if (fs.existsSync(dbPath)) {
//     try {
//         fs.unlinkSync(dbPath); // Deletes the database file
//         console.log('Database file deleted successfully');
//     } catch (err) {
//         console.error('Error deleting database file:', err);
//     }
// }


const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // initDB();
    }
});

// function initDB() {
//     db.serialize(() => {
//         db.run(`CREATE TABLE IF NOT EXISTS projects (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 name TEXT,
//                 description TEXT,
//                 dependencies TEXT DEFAULT "",
//                 color TEXT,
//                 progress REAL DEFAULT 0.0,
//                 is_template BOOLEAN DEFAULT false,
//                 start TEXT,
//                 end TEXT,
//                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
//                 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP  
//                 )`,(err) => {
//                     if (err) {
//                         console.error('Error creating users table ' + err.message);
//                     } else {
//                         console.log('Users table created or already exists.');
//                     }
//                 });

//         db.run(`CREATE TABLE IF NOT EXISTS tasks (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 project_id INTEGER,
//                 name TEXT,
//                 description TEXT,
//                 dependencies TEXT DEFAULT "",
//                 color TEXT,
//                 progress REAL DEFAULT 0.0,
//                 is_template BOOLEAN DEFAULT false,
//                 start TEXT,
//                 end TEXT,
//                 created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
//                 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP  
//                 )`, (err) => {
//                     if (err) {
//                         console.error('Error creating orders table ' + err.message);
//                     } else {
//                         console.log('Orders table created or already exists.');
//                     }
//                 });
//     });
// }

module.exports = db;
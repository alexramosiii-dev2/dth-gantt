const db = require('./db');
const { v4: uuidv4 } = require('uuid');

const create = function (task) {
    return new Promise((res, rej) => {
        const id = uuidv4();
        const { project_id, name, start, end, color, dependencies, description } = task;
        db.run(
            `INSERT INTO tasks (id, project_id, name, start, end, color, dependencies, description) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, project_id, name, start, end, color, dependencies, description, ],
            function (err) {
                (err) ? rej(err) : res(this.lastID)
            }
        );
    });
};

const findAll = function (filters = {}) {
    return new Promise((res, rej) => {
        let query = `SELECT * FROM tasks`;
        let conditions = [];
        let values = [];

        // Build WHERE conditions based on the filters provided
        for (let [key, value] of Object.entries(filters)) {
            conditions.push(`${key} = ?`);
            values.push(value);
        }

        // Add WHERE clause if filters are present
        if (conditions.length > 0) {
            query += ` WHERE ${conditions.join(' AND ')}`;
        }

        // Execute the query
        db.all(query, values, (err, rows) => {
            if (err) {
                rej(err);  // Reject the promise with the error
            } else {
                res(rows);  // Resolve the promise with the result rows
            }
        });
    });
};

const findByID = function (id) {
    return new Promise((res, rej) => {
        db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, row) => (err) ? rej(err) : res(row));
    });
};

const update = function (id, updatedTask) {
    return new Promise((res, rej) => {
        const { name, start, end, color, description, dependencies } = updatedTask;
        db.run(
            `UPDATE tasks 
           SET name = ?, start = ?, end = ?, color = ?, description = ?,  dependencies = ?
           WHERE id = ?`,
            [ name, start, end, color, description, dependencies, id],
            function (err) {
                if (err) {
                    return rej(err);
                }
                res({ changes: this.changes });
            }
        );
    });
};

const destroy = function (id) {
    return new Promise((res, rej) => {
        db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
            if (err) {
                return rej(err);
            }
            res({ changes: this.changes });
        });
    });
};


module.exports = {
    findAll, create, findByID, update, destroy
}


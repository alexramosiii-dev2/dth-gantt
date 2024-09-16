const db = require('./db');
const { v4: uuidv4 } = require('uuid');


const create = function (project) {
    return new Promise((res, rej) => {
        const id = uuidv4();
        const { name, start, end , description, color, dependencies} = project;

        db.run(
            `INSERT INTO projects (id, name, start, end, description, color, dependencies) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [id, name, start, end , description, color, dependencies],
            function (err) {
                (err) ? rej(err) : res(this.lastID)
            }
        );
    });
};

const findAll = function () {
    return new Promise((res, rej) => {
        db.all(`SELECT * FROM projects`, [], (err, rows) => (err) ? rej(err) : res(rows));
    });
};

const findByID = function (id) {
    return new Promise((res, rej) => {
        db.get(`SELECT * FROM projects WHERE id = ?`, [id], (err, row) => (err) ? rej(err) : res(row));
    });
};

const update = function (id, updatedProject) {
    return new Promise((res, rej) => {
        const { name, start, end, color, description } = updatedProject;
        db.run(
            `UPDATE projects 
           SET name = ?, start = ?, end = ?, color = ?, description = ?
           WHERE id = ?`,
            [ name, start, end, color, description, id],
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
        db.run(`DELETE FROM projects WHERE id = ?`, [id], function (err) {
            if (err) {
                return rej(err);
            }
            res({ changes: this.changes });
        });
    });
};


module.exports = {
    findAll, create, findByID, update
}


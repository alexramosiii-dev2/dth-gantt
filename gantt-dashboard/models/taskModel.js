import conn from './conn';

class Task {
    async all() {
        return conn.all();
    }

    async createUser(data) {
        return conn.create(data);
    }

    async updateUser(id, data) {
        return conn.update(id, data);
    }

    async deleteUser(id) {
        return conn.delete(id);
    }
}

export default new Task();

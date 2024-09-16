import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
// Replace with your relay server API base URL

class DbConnection {
    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                // Add authentication headers if needed
                // 'Authorization': `Bearer ${yourToken}`
            },
        });
    }

    //get all
    async all() {
        try {
            const response = await this.client.get();
            return response.data;
        } catch (error) {
            console.error('Error creating record:', error);
            throw error;
        }
    }

    // Create a new record
    async create(data) {
        try {
            const response = await this.client.post( "", data);
            return response.data;
        } catch (error) {
            console.error('Error creating record:', error);
            throw error;
        }
    }

    // Update a record
    async update(id, data) {
        try {
            const response = await this.client.put(`/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating record:', error);
            throw error;
        }
    }

    // Delete a record
    async delete( id) {
        try {
            const response = await this.client.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting record:', error);
            throw error;
        }
    }
}

export default new DbConnection();

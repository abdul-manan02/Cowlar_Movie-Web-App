import bcrypt from 'bcryptjs'
import BaseSQLModel from '../utils/baseSqlModel.js';
import db from '../utils/db.js'
import movieSchema from '../sqlSchemas/movie.schema.js';


class MovieModel extends BaseSQLModel {
    constructor() {
      super('Movie');
    }
  
    async createTable() {
      try {
        await db.query(movieSchema, [this.tableName]);
      } catch (error) {
        throw new Error(`Failed to create table: ${error.message}`);
      }
    }
  
    async create(data) {
      try {
        const insertQuery = `INSERT INTO ?? (title, description, release_date, user_id, image_url, video_url) VALUES (?, ?, ?, ?, ?, ?)`;
        console.log(data)
        const values = [data.title, data.description, data.release_date, data.user_id, data.image_url, data.video_url];
        
        await db.query(insertQuery, [this.tableName, ...values]);
  
        const selectQuery = `SELECT * FROM ?? ORDER BY created_at DESC LIMIT 1`;
        const [rows] = await db.query(selectQuery, [this.tableName]);
        return rows[0].id;
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }

    async incrementRating(movieId) {
      try {
        const query = `UPDATE ?? SET rating = rating + 1 WHERE id = ?`;
        await db.query(query, [this.tableName, movieId]);
      } catch (error) {
        throw new Error(`Failed to increment rating: ${error.message}`);
      }
    }

    async decrementRating(movieId) {
      try {
        const query = `UPDATE ?? SET rating = rating - 1 WHERE id = ?`;
        await db.query(query, [this.tableName, movieId]);
      } catch (error) {
        throw new Error(`Failed to decrement rating: ${error.message}`);
      }
    }
}
  
export default MovieModel;
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
  
    async create(data, id) {
      try {
        const insertQuery = `INSERT INTO ?? (title, description, release_year, user_id, image_url, video_url) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [data.title, data.description, data.release_year, id, data.image_url, data.video_url];
        
        await db.query(insertQuery, [this.tableName, ...values]);
  
        const selectQuery = `SELECT * FROM ?? ORDER BY created_at DESC LIMIT 1`;
        const [rows] = await db.query(selectQuery, [this.tableName]);
        return rows[0];
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }


    async getUserMovies(id){
      try{
          const query = `SELECT * FROM ?? WHERE user_id = ?`;
          const [rows] = await db.query(query, [this.tableName, id]);
          return rows;
      }catch(error){
          throw new Error(`Failed to get user movies: ${error.message}`);
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
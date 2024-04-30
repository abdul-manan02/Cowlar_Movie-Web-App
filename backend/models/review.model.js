import BaseSQLModel from '../utils/baseSqlModel.js';
import db from '../utils/db.js'
import reviewSchema from '../sqlSchemas/review.schema.js';


class ReviewModel extends BaseSQLModel {
    constructor() {
      super('Review');
    }
  
    async createTable() {
      try {
        await db.query(reviewSchema, [this.tableName]);
      } catch (error) {
        throw new Error(`Failed to create table: ${error.message}`);
      }
    }
  
    async create(data, id) {
      try {
        const insertQuery = `INSERT INTO ?? (movie_id, user_id, rating, review) VALUES (?, ?, ?, ?)`;
        const values = [data.movie_id, id, data.rating, data.review];
        
        await db.query(insertQuery, [this.tableName, ...values]);
  
        const selectQuery = `SELECT * FROM ?? ORDER BY created_at DESC LIMIT 1`;
        const [rows] = await db.query(selectQuery, [this.tableName]);
        return rows[0].id;
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }
  
    async getUserReviews (userId) {
      try {
        const query = `SELECT * FROM ?? WHERE user_id = ?`;
        const [rows] = await db.query(query, [this.tableName, userId]);
        return rows;
      } catch (error) {
        throw new Error(`Failed to find reviews: ${error.message}`);
      }
    }

    async findByMovieId(movieId) {
      try {
        const query = `SELECT * FROM ?? WHERE movie_id = ?`;
        const [rows] = await db.query(query, [this.tableName, movieId]);
        return rows;
      } catch (error) {
        throw new Error(`Failed to find reviews: ${error.message}`);
      }
    }
}
  
export default ReviewModel;
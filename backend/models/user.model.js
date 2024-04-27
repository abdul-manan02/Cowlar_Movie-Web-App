import bcrypt from 'bcryptjs'
import BaseSQLModel from '../utils/baseSqlModel.js';
import db from '../utils/db.js'
import userSchema from '../sqlSchemas/user.schema.js';

class UserModel extends BaseSQLModel {
  constructor() {
    super('User');
  }

  async createTable() {
    try {
      await db.query(userSchema, [this.tableName]);
    } catch (error) {
      throw new Error(`Failed to create table: ${error.message}`);
    }
  }

  async create(data) {
    try {
      const insertQuery = `INSERT INTO ?? (name, email, username, password, image_url) VALUES (?, ?, ?, ?, ?)`;
      const hashedPassword = await bcrypt.hash(data.password, 12);
      const values = [data.name, data.email, data.username, hashedPassword, data.image_url];
      
      await db.query(insertQuery, [this.tableName, ...values]);

      const selectQuery = `SELECT * FROM ?? ORDER BY created_at DESC LIMIT 1`;
      const [rows] = await db.query(selectQuery, [this.tableName]);
      return rows[0].id;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }


}

export default UserModel;
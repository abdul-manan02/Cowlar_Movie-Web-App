import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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

  async login(data){
    const username = data.username;
    const password = data.password;

    try{
      const query = `SELECT * FROM ?? WHERE username = ?`;
      const [rows] = await db.query(query, [this.tableName, username]);
      if(rows.length === 0){
        throw new Error('User not found');
      }
      const user = rows[0];
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if(isPasswordCorrect){
        const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, { expiresIn: '24h' });
        return { user, token };
      }
      else
        throw new Error('Invalid password');
    }
    catch(error){
      throw new Error(`Failed to login: ${error.message}`);
    }
  }
}

export default UserModel;
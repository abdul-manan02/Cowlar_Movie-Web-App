import db from './db.js'

class BaseSQLModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async dropTable() {
    try {
      const query = `DROP TABLE ??`;
      await db.query(query, [this.tableName]);
    } catch (error) {
      throw new Error(`Failed to drop table: ${error.message}`);
    }
  }

  async findAll(sortBy) {
    try {
      const query = `SELECT * FROM ??`;
      if(this.tableName === 'Movie'){
        if(sortBy === 'latest'){
          const Query = `${query} ORDER BY release_year DESC`;
          const [rows] = await db.query(Query, [this.tableName]);
          return rows;
        }
        else if(sortBy ==='rating'){
          const Query = `${query} ORDER BY rating DESC LIMIT 5`;
          const [rows] = await db.query(Query, [this.tableName]);
          return rows;
        }
      }
      const [rows] = await db.query(query, [this.tableName]);
      return rows;
    } catch (error) {
      throw new Error(`Failed to find all records: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const query = `SELECT * FROM ?? WHERE id = ?`;
      const [rows] = await db.query(query, [this.tableName, id]);
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to find record by id: ${error.message}`);
    }
  }
  
  async update(id, data) {
    try {
      const query = `UPDATE ?? SET ? WHERE id = ?`;
      const result = await db.query(query, [this.tableName, data, id]);
      return result[0].affectedRows;
    } catch (error) {
      throw new Error(`Failed to update record: ${error.message}`);
    }
  }
  
  async delete(id) {
    try {
      const query = `DELETE FROM ?? WHERE id = ?`;
      const result = await db.query(query, [this.tableName, id]);
      return result[0].affectedRows;
    } catch (error) {
      throw new Error(`Failed to delete record: ${error.message}`);
    }
  }
  
}

export default BaseSQLModel
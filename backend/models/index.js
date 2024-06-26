import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import config from "../config/config.js";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const { database, username, password, host } = config[env];
const db = {};

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      !file.includes(".test.js")
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
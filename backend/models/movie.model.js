import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import { v4 as uuidv4 } from "uuid";

import User from "./user.model.js";
class Movie extends Model {}

Movie.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "_id"
      },
    },
    image_url: DataTypes.STRING,
    video_url: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "Movie",
  }
);

export default Movie;

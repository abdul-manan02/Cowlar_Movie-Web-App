import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/db.js";
import { v4 as uuidv4 } from "uuid";
import User from "./user.model.js";
import Movie from "./movie.model.js";

class Review extends Model {}

Review.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    movie_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Movie,
        key: '_id',
        onDelete: 'CASCADE'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "_id"
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "Review",
    indexes: [
      {
        name: 'idx_movie_title',
        fields: ['movie_id']
      },
      {
        name: 'idx_user_id',
        fields: ['user_id']
      }
    ],
    uniqueKeys: {
      unique_movie_user: {
        fields: ['movie_id', 'user_id']
      }
    }
  }
);


export default Review;

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Review', {
      _id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      movie_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Movie',
          key: '_id',
          onDelete: 'CASCADE',
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: '_id',
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('Review', ['movie_id'], { name: 'idx_movie_id' });
    await queryInterface.addIndex('Review', ['user_id'], { name: 'idx_user_id' });

    await queryInterface.addConstraint('Review', {
      type: 'unique',
      fields: ['movie_id', 'user_id'],
      name: 'unique_movie_user',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Review');
  },
};

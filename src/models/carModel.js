import DataTypes from 'sequelize';

import databaseConfig from '../../configs/databaseConfig.js';

const Car = databaseConfig.sq.define(
  'car',
  {
    id_car: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    car_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    car_type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Car;

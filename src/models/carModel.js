import DataTypes from 'sequelize';

import databaseConfig from '../../configs/databaseConfig.js';

const Car = databaseConfig.sq.define(
  'car',
  {
    id_car: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    car_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    car_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default Car;

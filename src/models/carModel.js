import DataTypes from 'sequelize';

import sequalize from '../../configs/databaseConfig.js';

const Car = sequalize.define(
  'Car',
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

    car_size: {
      type: DataTypes.ENUM([
        'All',
        'Small',
        'Medium',
        'Large',
      ]),
      defaultValue: 'All',
    },

    photo_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Car;

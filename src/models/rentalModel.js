import DataTypes from 'sequelize';

import sequalize from '../../configs/databaseConfig.js';

const Rental = sequalize.define(
  'Rental',
  {
    id_rental: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Rental;

import Rental from './rentalModel.js';
import Car from './carModel.js';

Car.hasMany(Rental, {
  foreignKey: 'id_car',
  onDelete: 'CASCADE',
});

Rental.belongsTo(Car, { foreignKey: 'id_car' });

export { Car, Rental };

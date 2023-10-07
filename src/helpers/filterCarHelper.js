import {
  Car,
  Rental,
} from '../models/association.js';

const filterData = async (req) => {
  const { carName, carType, carSize } = req;
  console.log(carType);

  const whereClause = {};
  if (carType) {
    console.log(carType);
    whereClause.car_type = carType;
  }
  if (carName) {
    console.log(carName);
    whereClause.car_name = carName;
  }

  if (carSize) {
    whereClause.car_size = carSize;
  }

  console.log(whereClause);

  const carData = await Car.findOne({
    include: Rental,
    where: whereClause,
    returning: true,
    plain: true,
  });

  if (!carData) {
    throw new Error('Car data is not available!');
  } else {
    return carData;
  }
};

export default filterData;

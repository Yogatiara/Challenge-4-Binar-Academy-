import Car from '../models/carModel.js';

const filterData = async (...req) => {
  const [carName, carType] = req;

  const whereClause = {};
  if (carName) {
    whereClause.car_name = carName;
  }

  if (carType) {
    whereClause.car_type = carType;
  }

  const carData = await Car.findOne({
    where: whereClause,
    returning: true,
    plain: true,
  });

  if (!carData) {
    throw new Error('Car data is not avaible');
  } else {
    return carData;
  }
};

export default filterData;
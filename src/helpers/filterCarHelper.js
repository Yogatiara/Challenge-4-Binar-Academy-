import {
  Car,
  Rental,
} from '../models/association.js';

const filterData = async (req) => {
  try {
    const { carName, carType, carSize } = req;

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

    const carData = await Car.findOne({
      include: Rental,
      where: whereClause,
      returning: true,
      plain: true,
    });

    if (!carData) {
      throw new Error(
        'Car data is not available!'
      );
    } else {
      return carData;
    }
  } catch (err) {
    res.status(200).json({
      status: 'Failed',
      message: `${err}`,
    });
  }
};

export default filterData;

import {
  Car,
  Rental,
} from '../models/association.js';

import filterData from '../helpers/filterCarHelper.js';

const getCarData = async (req, res) => {
  try {
    const { carName, carType, carSize } =
      req.query;

    if (carSize) {
      const arg = {
        carSize: carSize,
      };
      const carData = await filterData(arg);

      if (req.url === 'api/v1/car') {
        return res.status(200).json({
          status: 'success',
          data: {
            carData,
          },
        });
      }

      const carArray = [carData];
      return carArray;
    } else if (carName && carType) {
      const arg = {
        carType: carType,
        carName: carName,
      };
      const carData = await filterData(arg);

      if (req.url === 'api/v1/car') {
        return res.status(200).json({
          status: 'success',
          data: {
            carData,
          },
        });
      }
      const carArray = [carData];
      return carArray;
    } else if (carName) {
      console.log(carName);

      const arg = {
        carName: carName,
      };
      const carData = await filterData(arg);
      if (req.url == 'api/v1/car') {
        return res.status(200).json({
          status: 'success',
          data: {
            carData,
          },
        });
      }
      const carArray = [carData];
      return carArray;
    } else if (carType) {
      console.log(carType);
      const arg = {
        carType: carType,
      };
      const carData = await filterData(arg);

      if (req.url === 'api/v1/car') {
        return res.status(200).json({
          status: 'success',
          data: {
            carData,
          },
        });
      }
      const carArray = [carData];
      return carArray;
    } else {
      const carData = await Car.findAll({
        include: Rental,
      });

      if (req.url === '/') {
        return carData;
      } else if ('/api/v1/car') {
        return res.status(200).json({
          status: 'success',
          data: {
            carData,
          },
        });
      }
    }
  } catch (err) {
    res.render('carNotFound.ejs');
  }
};

const insertCarData = async (req, res) => {
  try {
    const {
      carName,
      carType,
      price,
      carSize,
      photoPath,
    } = req.query;
    const newDataCar = await Car.create({
      car_name: carName,
      car_type: carType,
      car_size: carSize,
      photo_path: photoPath,
    });
    const newRental = await Rental.create({
      price: price,
      id_car: newDataCar.id_car,
    });

    res.status(200).json({
      status: 'Success',
      message: `Data added successfully`,
      data: {
        newdata: { newDataCar, newRental },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request : ${err.message}`,
    });
  }
};

const updateCarData = async (req, res) => {
  try {
    const { id_car } = req.params;
    const {
      car_name,
      car_type,
      car_size,
      photo_path,
      price,
    } = req.body;

    const carUpdate = await Car.update(
      {
        car_name,
        car_type,
        car_size,
        photo_path,
        price,
      },
      {
        where: { id_car },
        returning: true,
        plain: true,
      }
    );

    const rentalUpdate = await Rental.update(
      {
        price,
      },
      {
        where: { id_car },
        returning: true,
        plain: true,
      }
    );

    res.status(200).json({
      status: 'Succes',
      message: `Data with id : ${id_car} updated successfully`,
      dataUpdate: { carUpdate, rentalUpdate },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request : ${err.message}`,
    });
  }
};

const deleteCarData = async (req, res) => {
  try {
    const { id_car } = req.params;
    const deleteCarData = await Car.destroy({
      where: { id_car },
      returning: true,
      plain: true,
    });
    const existingCar = await Car.findByPk(
      id_car
    );

    // if (!existingCar) {
    //   throw new Error(
    //     `Data with id: ${id_car} not found`
    //   );
    // }

    res.status(200).json({
      status: 'success',
      message: `Data with id: ${id_car} deleted successfully`,
      deletedData: { deleteCarData },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request : ${err.message}`,
    });
  }
};

export {
  getCarData,
  insertCarData,
  updateCarData,
  deleteCarData,
};

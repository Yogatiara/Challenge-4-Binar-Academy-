import {
  Car,
  Rental,
} from '../models/association.js';

import filterData from '../helpers/filterCarHelper.js';

const getCarData = async (req, res) => {
  const { carName, carType } = req.query;
  if (carName && carType) {
    try {
      const carData = await filterData(
        carName,
        carType
      );

      res.status(200).json({
        status: 'success',
        data: {
          carData,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: `Bad request ${err}`,
      });
    }
  } else if (carName) {
    try {
      const carData = await filterData(carName);
      res.status(200).json({
        status: 'success',
        data: {
          carData,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: `Bad request : ${err.message}`,
      });
    }
  } else if (carType) {
    try {
      const carData = await filterData(carType);
      res.status(200).json({
        status: 'success',
        data: {
          carData,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: `Bad request : ${err.message}`,
      });
    }
  } else {
    try {
      const rentalData = await Car.findAll({
        include: Rental,
      });

      console.log(rentalData);
      res.status(200).json({
        status: 'Success',
        data: { ...rentalData },
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        message: `Bad request : ${err.message}`,
      });
    }
  }
};

const insertCarData = async (req, res) => {
  try {
    const newDataCar = await Car.create({
      ...req.body,
    });
    const newRental = await Rental.create({
      price: req.body.price,
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

    if (!existingCar) {
      throw new Error(
        `Data with id: ${id_car} not found`
      );
    }

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

import Car from '../models/carModel.js';
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
    await Car.findAll()
      .then((car) => {
        res.status(200).json({
          status: 'Success',
          data: { car },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 'Failed',
          message: `Bad request : ${err.message}`,
        });
      });
  }
};

const insertCarData = (req, res) => {
  try {
    const newCar = Car.create(req.body);

    res.status(200).json({
      status: 'Success',
      message: `Data added successfully`,
      data: {
        newdata: newCar,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request : ${err.message}`,
    });
  }
};

const updateCarData = (req, res) => {
  try {
    const { id_car } = req.params;
    const { car_name, car_type } = req.body;
    const carUpdate = Car.update(
      { car_name, car_type },
      {
        where: { id_car },
        returning: true,
        plain: true,
      }
    );
    res.status(200).json({
      status: 'Succes',
      message: `Data with id : ${id_car} updated successfully`,
      dataUpdate: { carUpdate },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request : ${err}`,
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
    res.status(200).json({
      status: 'success',
      message: `Data with id: ${id_car} deleted successfully`,
      deletedData: { deleteCarData },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request : ${err}`,
    });
  }
};

export {
  getCarData,
  insertCarData,
  updateCarData,
  deleteCarData,
};

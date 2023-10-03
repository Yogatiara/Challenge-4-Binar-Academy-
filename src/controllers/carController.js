import Car from '../models/carModel.js';

const getAllCars = async (req, res) => {
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
};

const insertCarData = async (req, res) => {
  await Car.create(req.body)
    .then((newCar) => {
      res.status(200).json({
        status: 'Success',
        data: {
          newdata: newCar,
        },
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'Failed',
        message: `Bad request : ${err.message}`,
      });
    });
};

const updateCarData = async (req, res) => {
  const id_car = req.params.id_car;
  const { car_name, car_type } = req.body;
  await Car.update(
    { car_name, car_type },
    {
      where: { id_car },
      returning: true,
      plain: true,
    }
  )
    .then((carUpdate) => {
      res.status(200).json({
        status: 'Succes',
        dataUpdate: { carUpdate },
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 'Failed',
        message: `Bad request : ${err}`,
      });
    });
};
export {
  getAllCars,
  insertCarData,
  updateCarData,
};

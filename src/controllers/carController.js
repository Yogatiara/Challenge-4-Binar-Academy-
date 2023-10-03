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

export { getAllCars };
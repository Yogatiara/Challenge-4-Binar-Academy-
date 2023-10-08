import {
  getCarData,
  insertCarData,
} from './carController.js';

import ImageKit from '../../lib/imageKit.js';

import {
  Car,
  Rental,
} from '../models/association.js';

const carsListPage = async (req, res) => {
  try {
    const rentalData = await getCarData(req, res);
    const carSize = getCarData(req, res);
    console.log(rentalData);
    res.render('index.ejs', {
      rentalData,
      fullUrl: carSize
        ? `http://localhost:3000/?category=${carSize}`
        : 'http://localhost:3000/',
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request: ${err.message}`,
    });
  }
};

const insertCarPage = async (req, res) => {
  res.render('create.ejs');
};

const insertCar = async (req, res) => {
  try {
    const { carName, carType, price, carSize } =
      req.query;
    const newDataCar = await Car.create({
      car_name: carName,
      car_type: carType,
      car_size: carSize,
    });
    await Rental.create({
      price: price,
      id_car: newDataCar.id_car,
    });
    res.redirect('/dashboard');
    req.flash('message', 'Ditambah');
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: `Bad request : ${err.message}`,
    });
  }
};

const createCar = async (req, res) => {
  const file = req.file;

  try {
    const split = file.originalname.split('.');
    const extension = split[split.length - 1];

    const img = await ImageKit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${extension}`,
    });

    let data = {
      ...req.body,
      dateUpdated: req.date,
      imageUrl: img.url,
    };
    await Admin.create(data);

    req.flash('message', 'Ditambah');
    res.redirect('/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

export {
  carsListPage,
  insertCarPage,
  insertCar,
  createCar,
};

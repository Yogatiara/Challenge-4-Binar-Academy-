import { getCarData } from './carController.js';

const carsListPage = async (req, res) => {
  try {
    const rentalData = await getCarData(req, res);
    const carSize = getCarData(req, res);
    // console.log(rentalData);
    res.render('index.ejs', {
      rentalData,
      fullUrl: carSize
        ? `http://localhost:3000/?category=${carSize}`
        : 'http://localhost:3000/',
    });
  } catch (err) {
    res.status(200).json({
      status: 'Failed',
      message: `Bad request: ${err.message}`,
    });
  }
};

export { carsListPage };

import { getCarData } from './carController.js';

const carsListPage = async (req, res) => {
  const rentalData = await getCarData(req, res);
  console.log(Array.isArray(rentalData));
  console.log(rentalData);
  res.render('index.ejs', {
    rentalData,
  });
};

export { carsListPage };

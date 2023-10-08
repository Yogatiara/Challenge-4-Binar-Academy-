import { Router } from 'express';

import {
  carsListPage,
  insertCarPage,
  insertCar,
  createCar,
} from '../controllers/adminController.js';

import upload from '../middlewares/uploader.js';
// import { insertCarData } from '../controllers/carController.js';
const router = Router();
router.post(
  '/car/add',
  upload.single('image'),
  createCar
);
router.post('/cars/add', insertCar);
router.get('/create', insertCarPage);
router.get('/', carsListPage);

export default router;

import { Router } from 'express';

import {
  getAllCars,
  insertCarData,
  updateCarData,
} from '../controllers/carController.js';

const router = Router();

router
  .route('/')
  .get(getAllCars)
  .post(insertCarData);

router.route('/:id_car').put(updateCarData);

export default router;

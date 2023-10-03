import { Router } from 'express';

import {
  getAllCars,
  insertCarData,
} from '../controllers/carController.js';

const router = Router();

router
  .route('/')
  .get(getAllCars)
  .post(insertCarData);

export default router;

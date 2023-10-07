import { Router } from 'express';

import {
  insertCarData,
  updateCarData,
  deleteCarData,
  getCarData,
} from '../controllers/carController.js';

const router = Router();

router.route('/v1/car').get(getCarData);

router
  .route('/v1/car/create')
  .post(insertCarData);

router
  .route('/v1/car/:id_car')
  .put(updateCarData)
  .delete(deleteCarData);

export default router;

import { Router } from 'express';

import {
  insertCarData,
  updateCarData,
  deleteCarData,
  getCarData,
} from '../controllers/carController.js';

const router = Router();

router.route('/').get(getCarData);

router.route('/create').post(insertCarData);

router
  .route('/:id_car')
  .put(updateCarData)
  .delete(deleteCarData);

export default router;

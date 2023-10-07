import { Router } from 'express';

import { carsListPage } from '../controllers/adminController.js';
const router = Router();

router.get('/', carsListPage);

export default router;

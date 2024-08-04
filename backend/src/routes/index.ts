// src/routes/index.ts

import { Router } from 'express';
import temperatureRoutes from '../temperature/temperature.route';

const router: Router = Router();

// Use the temperature routes with a '/temperatures' prefix
router.use('/temperature', temperatureRoutes);

export default router;

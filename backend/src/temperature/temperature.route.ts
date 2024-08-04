import { Router } from 'express';
import { getTemperaturesByLocation } from './temperature.controller';

const router: Router = Router();

router.get('/location', getTemperaturesByLocation);

export default router;

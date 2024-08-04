// src/controllers/temperatureController.ts

import { Request, Response } from 'express';
import { getTemperatureData } from './temperature.service';

export const getTemperaturesByLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lat, lng, radius } = req.query;
    
    if (!lat || !lng) {
      res.status(400).json({ message: 'Latitude and Longitude are required' });
      return;
    }
    
    const temperatureData = await getTemperatureData(
      parseFloat(lat as string),
      parseFloat(lng as string),
      radius ? parseInt(radius as string) : 7
    );
    console.log('here', temperatureData);
    

    res.json(temperatureData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching temperature data', error });
  }
};

// src/services/temperatureService.ts

import h3 from 'h3-js';
import axios from 'axios';
import Temperature, { ITemperature } from '../models/temperature';

const openWeatherApiKey = process.env.OPENWEATHER_API_KEY || '3ca87b6b4b3666084b753e770b1db8c1';

// Function to normalize the temperature
const  normalizeTemperature = (temperature: number, minTemp: number = -50, maxTemp: number = 50): number =>{
  return (temperature - minTemp) / (maxTemp - minTemp);
}

export const getTemperatureData = async(lat: number, lng: number, res: number) =>{
  try {
    const hexId = h3.latLngToCell(lat, lng, res);
    const hexagons = [...h3.gridDisk(hexId, 2)];

    // Find hexagons in the database
    const foundHexagons = await Temperature.find({ hexId: { $in: hexagons } });

    if (foundHexagons.length === hexagons.length) {
      // Return found hexagons with normalized temperature
      return foundHexagons.map(hex => ({
        lat: hex.center.lat,
        lng: hex.center.lng,
        normalizedTemp: hex.normalizedTemp
      }));
    }

    // Identify missing hexagons
    const missingHexagons = hexagons.filter(
      hex => !foundHexagons.some(fh => fh.hexId === hex)
    );
    console.log('found missingHexagon', missingHexagons.length, 'existing hexagons', foundHexagons);

    // Fetch data for missing hexagons
    const newTemperatureData: ITemperature[] = await Promise.all(
      
      missingHexagons.map(async hex => {
        const [hexLat, hexLng] = h3.cellToLatLng(hex);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${hexLat}&lon=${hexLng}&units=metric&appid=${openWeatherApiKey}`
        );

        const temperature = response.data.main.temp;

        // Normalize temperature
        const normalizedTemp = normalizeTemperature(temperature);

        // Create new temperature data document
        const temperatureData = new Temperature({
          hexId: hex,
          temperature,
          normalizedTemp, // Store normalized temperature
          center: {
            lat: hexLat,
            lng: hexLng,
          },
        });

        await temperatureData.save();
        return temperatureData;
      })
    );

    // Combine found and new hexagons, returning lat, lng, and normalizedTemp
    const allHexagons = [...foundHexagons, ...newTemperatureData];
    return allHexagons.map(hex => ({
      lat: hex.center.lat,
      lng: hex.center.lng,
      normalizedTemp: hex.normalizedTemp
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

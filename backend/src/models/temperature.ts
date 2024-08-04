// src/models/Temperature.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ITemperature extends Document {
  hexId: string;
  temperature: number;
  normalizedTemp: number; // Add normalized temperature to the interface
  center: {
    lat: number;
    lng: number;
  };
}

// Function to normalize the temperature
function normalizeTemperature(temperature: number, minTemp: number = -50, maxTemp: number = 50): number {
  return (temperature - minTemp) / (maxTemp - minTemp);
}

const TemperatureSchema: Schema = new Schema({
  hexId: { type: String, required: true, unique: true },
  temperature: { type: Number, required: true },
  normalizedTemp: { type: Number, required: true }, // Add normalized temperature to schema
  center: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

// Pre-save middleware to automatically normalize temperature before saving
TemperatureSchema.pre<ITemperature>('save', function(next) {
  this.normalizedTemp = normalizeTemperature(this.temperature);
  next();
});

export default mongoose.model<ITemperature>('Temperature', TemperatureSchema);

// src/Heatmap.js

import React from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { HeatLatLngTuple, LatLng, LatLngTuple } from "leaflet";
import "leaflet.heat";
const karachi: LatLngTuple = [24.860966, 66.990501];
const heatPoints: Array<HeatLatLngTuple> = [
  [24.860967, 66.390501, 1],
  [24.860968, 66.290602, 1],
  [24.860969, 67.190703, 1],
  [24.86097, 67.00804, 1],
  [24.860971, 67.990905, 1],
  [24.860972, 66.990506, 1],
  [24.860973, 66.990507, 1],
  [24.860974, 66.990508, 1],
  [24.860975, 66.990509, 1],
  [24.880966, 67.000501, 0.4],
];

interface HeatmapProps {
  points: Array<HeatLatLngTuple>;
}
const Heatmap = ({ points }: HeatmapProps) => {
  const map = useMap();

  React.useEffect(() => {
    const heat = L.heatLayer(points, {
      radius: 100,
      blur: 30,
      minOpacity: 0.3,
      gradient: { 0.4: "blue", 0.65: "lime", 1: "red" },
    }).addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const Map = ({ points, zoom = 13 }: HeatmapProps & { zoom?: number }) => (
  <MapContainer
    center={karachi}
    zoom={zoom}
    minZoom={4}
    style={{ height: "100vh", width: "100%" }}
  >
    <Heatmap points={points} />
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
  </MapContainer>
);

export default Map;

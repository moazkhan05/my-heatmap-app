const h3 = require('h3-js');

function getHexagonsForEarth(resolution) {
    const hexagons = new Set();
    const latStep = 0.1; // Adjust as necessary for granularity
    const lngStep = 0.1; // Adjust as necessary for granularity

    for (let lat = -90; lat <= 90; lat += latStep) {
        for (let lng = -180; lng <= 180; lng += lngStep) {
            const hex = h3.latLngToCell(lat, lng, resolution);
            hexagons.add(hex);
        }
    }

    return Array.from(hexagons);
}

const resolution = 7;
const hexagons = getHexagonsForEarth(resolution);
console.log(`Total number of unique hexagons at resolution ${resolution}: ${hexagons.length}`);

# My Heatmap App

## Task Definition

The primary task of this project is to develop a web-based heatmap visualization application that displays real-time temperature data. The application uses a hexagonal grid system to map and visualize temperature data for specific locations, leveraging the OpenWeather API for live data. The solution involves building both frontend and backend components, ensuring seamless integration, data management, and efficient API usage while adhering to rate limits.

## Architecture and Developer's Notes

### Architecture Overview

1. **Frontend**:
   - A user-friendly interface allows users to search for specific locations and view temperature data on a map.
   - The map is divided into hexagons, with each hexagon representing an area of the Earth at a specific resolution.

2. **Backend**:
   - An API server processes requests from the frontend, determines the corresponding hexagons using the H3 library, and retrieves or computes temperature data.
   - Integration with the OpenWeather API to fetch real-time temperature data for specific hexagons.
   - A MongoDB database stores hexagon IDs, their center points, and normalized temperature values.

3. **Database**:
   - MongoDB is used to persist temperature data associated with hexagons, minimizing redundant API calls and managing rate limits efficiently.

### Developer's Notes

- **H3 Library Usage**: The H3 library is critical for dividing the world into hexagons and calculating neighboring hexagons for a given location.
- **API Rate Limiting**: The OpenWeather API has a limit of 60 requests per minute. The backend is designed to manage these limits by grouping hexagons into batches and caching results to minimize unnecessary requests.
- **Hexagon Resolution**: A fixed resolution of 7 is used for hexagon calculations, providing an optimal balance between coverage and performance.
- **Error Handling**: The backend includes retry logic for MongoDB connections and handles potential API request failures gracefully.

## Project Flow

1. **User Interaction**:
   - The user searches for a location using the frontend interface (Google Places Autocomplete).
   - The selected location's latitude and longitude are sent to the backend.

2. **Backend Processing**:
   - The backend calculates the hexagon corresponding to the provided lat/lng using the H3 library.
   - It also computes the neighboring hexagons (up to 2 levels) to form a grid of 19 hexagons.

3. **Data Retrieval**:
   - The backend checks if the temperature data for these hexagons is already present in the MongoDB database.
   - If data is missing, the backend makes requests to the OpenWeather API to fetch temperature data.
   - The data is normalized and stored in the database for future use.

4. **Response**:
   - The backend returns the temperature data (including normalized values) for the hexagons to the frontend.
   - The frontend displays this data on the map using a color-coded heatmap.

## Technologies Used

### Frontend
- **React & TypeScript**: For developing the user interface.
- **React-Leaflet**: To integrate a map and visualize hexagon data.
- **Google Places Autocomplete**: To allow users to search for locations.

### Backend
- **Node.js & Express**: For building the API server.
- **Mongoose**: As an ORM for MongoDB to handle database operations.
- **H3-js**: For hexagonal grid calculations and spatial indexing.
- **OpenWeather API**: To fetch real-time temperature data.

### Database
- **MongoDB**: To store and manage hexagon-based temperature data.

## Project Structure

- **frontend/**: Contains the React application.
- **backend/**: Contains the Node.js application with Express.
- **docker-compose.yml**: Docker Compose file for setting up the development environment.

## Commands to Run the Project

### Prerequisites
- Docker
- Docker Compose

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/my-heatmap-app.git
   cd my-heatmap-app

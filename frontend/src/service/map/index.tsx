import axios from "axios";
import { PlacesClient } from "@googlemaps/places";

const googleApiKey = process.env.GoogleApiKey;
class MapService {
  async temperatureBasedOnLocation(
    location?: {
      lat: number;
      lng: number;
    },
    // zoom: number
  ) {
    const karachi = [24.860966, 66.990501];

    const response = await axios({
      method: "GET",
      url: `http://192.168.30.250:3000/api/temperature/location?lat=${karachi[0]}&lng=${karachi[1]}&radius=7`,
    });
    return response.data as Array<Data>;
  }

  async search(search: string) {
    console.log("here");
    const placesClient = new PlacesClient();

    const request = {
      input: search,
    };
    const _places = await placesClient.autocompletePlaces(request);

    console.log({ _places });
    // Run request
    // const response = await placesClient.searchText(request, {
    //   otherArgs: {
    //     headers: {
    //       "X-Goog-FieldMask": "places.displayName",
    //     },
    //   },
    // });
  }
}

export interface Data {
  lat: number;
  lng: number;
  normalizedTemp: number;
}

export default new MapService();
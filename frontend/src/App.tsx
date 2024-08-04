import { useQuery } from "@tanstack/react-query";
import Map from "./components/map";
import SearchBar from "./components/searchbar";
import mapService from "./service/map";
import { HeatLatLngTuple } from "leaflet";
import { useState } from "react";
const karachi = [24.860966, 66.990501];

function App() {
  const [search, setSearch] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["cordinates"],
    queryFn: () => mapService.temperatureBasedOnLocation(),
  });
  const { data: searchData } = useQuery({
    queryKey: ["search", search],
    queryFn: () => mapService.search(search),
  });

  const _points = data?.map((_data) => [
    _data.lat,
    _data.lng,
    _data.normalizedTemp,
  ]) as Array<HeatLatLngTuple>;
  console.log({ searchData });
  return (
    <>
      <div className="relative">
        <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} />
        {search}
        {_points && <Map points={_points} />}
      </div>
    </>
  );
}

export default App;

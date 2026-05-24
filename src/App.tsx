import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import points from "./points.json";
import Search from "./Search";
import type { LabeledPoint } from "./types";

function App() {
  return (
    <MapContainer
      center={[54, 17.75]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point: LabeledPoint) => (
        <Circle
          center={[point.lat, point.lng]}
          radius={25}
          weight={8}
          color="#a00"
        >
          <Popup>
            {point.name} ({point.code})
          </Popup>
        </Circle>
      ))}
      <Search points={points} />
    </MapContainer>
  );
}

export default App;

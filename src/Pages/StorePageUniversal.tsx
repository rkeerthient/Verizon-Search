import { Map } from "@yext/sites-components";
import { MapboxMaps } from "@yext/components-tsx-maps";
import CustomMarkerUniversal from "../components/CustomMarkerUniversal";
import "mapbox-gl/dist/mapbox-gl.css";

const StoreLocatorUniversal = ({ data }: any): JSX.Element => {
  return (
    <Map
      provider={MapboxMaps}
      defaultZoom={15}
      bounds={data.map((data: any) => data.rawData.geocodedCoordinate)}
      className="h-[400px] w-full"
      apiKey="pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ"
    >
      {data.map((data: any, index: any) => (
        <CustomMarkerUniversal
          key={data.rawData.id}
          coordinate={data.rawData.geocodedCoordinate}
          id={data.id}
          index={index + 1}
        />
      ))}
    </Map>
  );
};

export default StoreLocatorUniversal;

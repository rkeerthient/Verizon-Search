import * as mapboxgl from "mapbox-gl";
import { Map, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect } from "react";

const Mapboxuniv = ({ data }: any) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const mapInstance = new mapboxgl.Map({
        accessToken:
          "pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ",
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-70.9, 42.35],
        zoom: 9,
      });
      map.current = mapInstance;
      map.current.resize();
    }
  }, [mapContainer]);

  useEffect(() => {
    const mapbox = map.current;
    if (mapbox && data.length > 0) {
      const bounds = new LngLatBounds();

      data.forEach((item: any) => {
        const el = document.createElement("div");
        el.className = "marker";
        el.innerHTML = `<svg fill="#FF0000" height="49" viewBox="0 0 29 49" width="29" xmlns="http://www.w3.org/2000/svg">
          <path d="m14.5.5c4 0 7.5028 1.49535 10.0037 3.99628 2.501 2.50093 3.9963 6.00372 3.9963 10.00372 0 4.3786-2.3969 7.7986-5.1195 11.7503-3.7142 5.391-8.0637 11.7263-8.3618 22.4575-1.3355-10.7312-5.68504-17.0665-9.39921-22.4575-2.72261-3.9517-5.11949-7.3717-5.11949-11.7503 0-4 1.49535-7.50279 3.99628-10.00372s6.00372-3.99628 10.00372-3.99628z" fill="#002F3A" />
          <text x="40%" y="50%" fontSize="14px" fontWeight="bold" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF">${item.index}</text>
        </svg>`;

        new mapboxgl.Marker(el)
          .setLngLat({
            lng: item.rawData.yextDisplayCoordinate.longitude,
            lat: item.rawData.yextDisplayCoordinate.latitude,
          })
          .addTo(mapbox);

        bounds.extend([
          item.rawData.yextDisplayCoordinate.longitude,
          item.rawData.yextDisplayCoordinate.latitude,
        ]);
      });

      if (!bounds.isEmpty()) {
        mapbox.fitBounds(bounds, {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          maxZoom: 15,
        });
      }
    }
  }, [data]);

  return <div ref={mapContainer} className="map-container" />;
};

export default Mapboxuniv;

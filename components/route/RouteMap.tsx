import React from "react";
import { WebView } from "react-native-webview";
import { PersistedPoint } from "@/types";

interface RouteMapProps {
  coords: PersistedPoint[];
  style?: any;
}

export default function RouteMap({ coords, style }: RouteMapProps) {
  // HTML skeleton for Leaflet map
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        html, body, #map {
          height: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
    </body>
  </html>
  `;

  // Inject coordinates at load time
  const injectedJS = `
    (function() {
      const coords = ${JSON.stringify(coords)};
      if(coords.length > 0){
        const latlngs = coords.map(c => [c.latitude, c.longitude]);
        const map = L.map('map').setView(latlngs[0], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.polyline(latlngs, { color: 'blue' }).addTo(map);
        map.fitBounds(latlngs);
      }
    })();
    true;
  `;

  return (
    <WebView
      originWhitelist={["*"]}
      source={{ html }}
      injectedJavaScript={injectedJS}
      style={[{ flex: 1, width: "100%" }, style]}
    />
  );
}

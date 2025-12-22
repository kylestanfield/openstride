import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { PersistedPoint } from "@/types";

interface RouteMapProps {
  coords: PersistedPoint[];
  style?: any;
}

export default function RouteMap({ coords, style }: RouteMapProps) {
  const pointsJson = JSON.stringify(coords);

  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        html, body, #map { height: 100vh; width: 100vw; margin: 0; padding: 0; background-color: #f8f9fa; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        function initMap() {
          const coords = ${pointsJson};
          if (!coords || coords.length === 0) return;

          const latlngs = coords.map(c => [c.latitude, c.longitude]);
          const map = L.map('map', { zoomControl: false }).setView(latlngs[0], 14);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OSM'
          }).addTo(map);

          L.polyline(latlngs, { color: '#007AFF', weight: 4, opacity: 0.8 }).addTo(map);
          map.fitBounds(latlngs, { padding: [20, 20] });
        }

        // iOS specific: check if Leaflet is ready
        function checkLeaflet() {
          if (typeof L !== 'undefined' && L.map) {
            initMap();
          } else {
            setTimeout(checkLeaflet, 100);
          }
        }

        window.onload = checkLeaflet;
      </script>
    </body>
  </html>
  `;

  return (
    <View style={[styles.container, style]}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

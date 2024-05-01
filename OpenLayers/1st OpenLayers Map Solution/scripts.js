const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-75.14671922, 39.94877326]), // Center of the map
    zoom: 12, // Zoom level
  }),
});

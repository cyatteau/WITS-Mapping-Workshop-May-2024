const map = new maplibregl.Map({
  container: "map", // container id
  style:
    "https://api.jawg.io/styles/jawg-sunny.json?access-token=f6poGAp1T61DhCzmnI7eedJGHaoWPQ6vDtp7lTY3o8wNucLc2hsjB7J4NdaRxons", // style URL
  center: [-75.14671922, 39.94877326], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

const libertyBell = [-75.150276, 39.9494193];
const philly = [-75.14671922, 39.94877326];
const cherryHillNJ = [-75.030928, 39.925801];

////Marker
const marker = new maplibregl.Marker().setLngLat(philly).addTo(map);

////Adding a Line
// map.on("load", () => {
//   map.addSource("myLine", {
//     type: "geojson",
//     data: {
//       type: "FeatureCollection",
//       features: [
//         {
//           type: "Feature",
//           properties: { description: "A line that I added" },
//           geometry: {
//             type: "LineString",
//             coordinates: [
//               libertyBell, // Start point
//               cherryHillNJ, // End point
//             ],
//           },
//         },
//       ],
//     },
//   });
//   map.addLayer({
//     id: "theLine",
//     type: "line",
//     source: "myLine",
//   });
// });

////Feature Layer
map.once("load", () => {
  map.addSource("zipcodes", {
    type: "geojson",
    data: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/Boundaries_District/FeatureServer/0/query?f=geojson&where=1=1",
  });

  map.addLayer({
    id: "zipcodes-polygons",
    type: "fill",
    source: "zipcodes",
    paint: {
      "fill-color": "hsl(200, 80%, 50%)",
      "fill-opacity": 0.5,
      "fill-outline-color": "black",
    },
  });
});

////GeoEnrichment
map.on("click", async (e) => {
  const response = await arcgisRest.queryDemographicData({
    studyAreas: [
      {
        geometry: {
          x: e.lngLat.lng,
          y: e.lngLat.lat,
        },
      },
    ],
    authentication: arcgisRest.ApiKeyManager.fromKey(
      "AAPK585d954ab7a44b2f98e8a4406019115bD-VrVSpxg15QCIhyJl-bZSceC_H-KCvbR5VkCvkDaFrkS6mCjdmbG96ZYAK2NVlq"
    ),
  });

  const attributes =
    response.results[0].value.FeatureSet[0].features[0].attributes;

  new maplibregl.Popup()
    .setHTML(
      `Population: ${attributes.TOTPOP}<br/>` +
        `Males: ${attributes.TOTMALES}<br/>` +
        `Females: ${attributes.TOTFEMALES}<br/>` +
        `Average household size: ${attributes.AVGHHSZ}`
    )
    .setLngLat(e.lngLat)
    .addTo(map);
});

const map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-75.14671922, 39.94877326]),
    zoom: 14,
  }),
});

const libertyBell = [-75.150276, 39.9494193];
const hotel = [-75.154099033752, 39.947329987747];
const museum = [-75.147212965017, 39.948133015981];
const bankBuilding = [-75.148241005441, 39.949242989509];
const bishopWH = [-75.146897969554, 39.94723472638];
const indVisCenter = [-75.1499, 39.95122];

////Handling Features

////Simple Direct Geometry (adding two points and a line)
// const vectorLayer = new ol.layer.Vector({
//   source: new ol.source.Vector({
//     features: [new ol.Feature({
//       geometry: new ol.geom.Point(ol.proj.fromLonLat(libertyBell))
//     }), new ol.Feature({
//       geometry: new ol.geom.Point(ol.proj.fromLonLat(hotel)) // Coordinates for the second point
//     }), new ol.Feature({
//       geometry: new ol.geom.LineString([ol.proj.fromLonLat(libertyBell), ol.proj.fromLonLat(hotel)])
//     })]
//   })
// });
// map.addLayer(vectorLayer);

////Direct GeoJSON
// const vectorLayer = new ol.layer.Vector({
//   source: new ol.source.Vector({
//     features: new ol.format.GeoJSON().readFeatures({
//       'type': 'FeatureCollection',
//       'features': [
//           { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': museum }},
//           { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': indVisCenter }},
//           { 'type': 'Feature', 'geometry': { 'type': 'LineString', 'coordinates': [museum, indVisCenter] }}
//       ]
//     }, {
//       dataProjection: 'EPSG:4326',
//       featureProjection: 'EPSG:3857'
//     })
//   })
// });
// map.addLayer(vectorLayer);

////GeoJSON Sources
////Philadelphia Schools
const schoolsLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/philadelphia_pa_schools/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson",
  }),
});
map.addLayer(schoolsLayer);

//Philadelphia City Limits
const cityLimitsLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/City_Limits/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson",
  }),
});
map.addLayer(cityLimitsLayer);

////WMS Layers - replace 'source' above

////USGS National Orthoimagery
new ol.source.TileWMS({
  url: "https://basemap.nationalmap.gov/arcgis/services/USGSImageryOnly/MapServer/WMSServer",
  params: { LAYERS: "0" },
  serverType: "geoserver",
})

////Geoserver Topographic States
new ol.source.TileWMS({
  url: "https://ahocevar.com/geoserver/wms",
  params: { LAYERS: "topp:states" },
  serverType: "geoserver",
})


////Image Layers - REPLACE THE map VARIABLE AT THE TOP

////An old map of Newark, New Jersey, from 1922. From the Perry-Castañeda Library Map Collection.
// const map = new ol.Map({
//   target: 'map',
//   layers: [new ol.layer.Image({
//     source: new ol.source.ImageStatic({
//       url: 'https://legacy.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
//       projection: 'EPSG:4326',
//       imageExtent: [-74.2, 40.6, -74.0, 40.8] // Approximate extent for Newark, NJ
//     })
//   })],
//   view: new ol.View({
//     center: ol.proj.fromLonLat([-74.1, 40.7]),
//     zoom: 12
//   })
// });

////Aug 2020 - Hurricane Laura Satellite Image near Cameron, Louisiana
// const map = new ol.Map({
//   target: 'map',
//   layers: [new ol.layer.Image({
//     source: new ol.source.ImageStatic({
//       url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/147000/147180/laura_vir_2020240_lrg.jpg',
//       projection: 'EPSG:4326',
//       imageExtent: [-100.0, 10.0, -80.0, 30.0] // Approximate extent for the Gulf of Mexico area
//     })
//   })],
//   view: new ol.View({
//     center: ol.proj.fromLonLat([-90.0, 20.0]), // Centering on the Gulf of Mexico
//     zoom: 5 // A zoom level that provides a good view of the hurricane
//   })
// });


//ArcGIS Custom Vector Tile Map
// const basemapURL = `https://basemapstyles-api.arcgis.com/arcgis/rest/services/styles/v2/styles/items/6976148c11bd497d8624206f9ee03e30?token=AAPK585d954ab7a44b2f98e8a4406019115bD-VrVSpxg15QCIhyJl-bZSceC_H-KCvbR5VkCvkDaFrkS6mCjdmbG96ZYAK2NVlq`;
// olms.apply(map, basemapURL)

////Place vector layers on top of custom vector tile basemap
// .then(() => {
//   ////Philadelphia Schools
//   const schoolsLayer = new ol.layer.Vector({
//     source: new ol.source.Vector({
//       format: new ol.format.GeoJSON(),
//       url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/philadelphia_pa_schools/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson",
//     }),
//   });
//   map.addLayer(schoolsLayer);

//   //Philadelphia City Limits
//   const cityLimitsLayer = new ol.layer.Vector({
//     source: new ol.source.Vector({
//       format: new ol.format.GeoJSON(),
//       url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/City_Limits/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&f=geojson",
//     }),
//   });
//   map.addLayer(cityLimitsLayer);
// });
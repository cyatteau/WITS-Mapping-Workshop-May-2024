const map = L.map("map").setView([39.94877326, -75.14671922], 17); //[latitude, longitude], zoom
const philly = [39.94877326, -75.14671922];
const libertyBell = [39.9494193, -75.150276];
const museum = [39.948133015981, -75.147212965017];
const bankBuilding = [39.949242989509, -75.148241005441];
const hotel = [39.947329987747, -75.154099033752];
const bishopWH = [39.94723472638, -75.146897969554];
const indVisCenter = [39.95122, -75.1499];

//hint: Find latitude and longitude of a place with this url, replacing the ADDRESS/PLACE: https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=pjson&outFields=ADDRESS/PLACE
const arcgisKey =
  "your_key";

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//Shapes
const marker = L.marker(philly).addTo(map);
const line = L.polyline([philly, bankBuilding]).addTo(map);
const circle = L.circle(libertyBell).addTo(map);
const polygon = L.polygon([philly, libertyBell, museum]).addTo(map);

//layer group
const layerGroup = L.layerGroup().addTo(map);
marker.addTo(layerGroup);
line.addTo(layerGroup);

//Click
map.on("click", (e) => {
  L.marker(e.latlng).addTo(map);
});

//Mouseover
marker.on("mouseover", (e) => {
  alert("Mouse over the marker.");
});

//Drag
const draggableMarker = L.marker(indVisCenter, {
  draggable: true,
}).addTo(map);
draggableMarker.on("dragend", (e) => {
  alert("Marker dragged to: " + e.target.getLatLng().toString());
});

//Popup
const marker2 = L.marker(hotel).addTo(map);
marker2.bindPopup("Morris House Hotel");

//Tooltip
let marker3 = L.marker(bishopWH).addTo(map);
marker3.bindTooltip(() => {
  return "Bishop White House";
});

//Geosearch - API REFERENCE: developers.arcgis.com/esri-leaflet/api-reference/controls/geosearch/
const searchControl = L.esri.Geocoding.geosearch({
  useMapBounds: false,
  providers: [
    L.esri.Geocoding.arcgisOnlineProvider({
      apikey: arcgisKey,
    }),
  ],
}).addTo(map);

//show search result
searchControl.on("results", (data) => {
  const marker = L.marker(data.results[0].latlng);
  marker.addTo(map);
  marker.bindPopup(`${data.results[0].latlng}`);
});

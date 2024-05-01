const map = L.map("map").setView([39.94877326, -75.14671922], 13); //[latitude, longitude], zoom

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//To observe the image network requests, go to the chrome developer tools (Ctrl+Shift+I / Cmd+Option+I), 
//Click on Network. Type in the filer option tile.openstreetmap.org then pan and zoom around the map to observe the new tile requests. 
//Click on a specific tile to view it's details. Observe caching by panning back to an area after moving away and notice it's load time it much faster.

// Create map, centering map image on United States, set zoom level
var map = L.map('map').setView([37, -97], 4);

// Create Open Street Map basemap layer, with attribution
var baseMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map); // Add to blank map to provide base layer

// Layers will be added to map in the order they are written here. So, final map has basemap, then goes, then radar, then lightning.

// Create WMS map layer displaying infrared satellite imagery via GOES
var goes = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_imagery_goes_time/MapServer/WMSServer", {
    layers: '1', // Specify IR layer of GOES WMS to be added to map
    format: 'image/png',
    transparent: true,
    attribution: "NOAA",
    opacity: 0.75 // Dim layer so basemap underneath can be seen
  }).addTo(map);  // Add layer to map

// Create WMS map layer displaying base reflectivity radar imagery via Iowa State Mesonet
var radar = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913', // Specify base reflectivity product layer to be added to map
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad"
}).addTo(map); // Add layer to map

// Create WMS map layer displaying lightning strike data via NOAA
var lightning = L.tileLayer.wms("http://nowcoast.noaa.gov/arcgis/services/nowcoast/sat_meteo_emulated_imagery_lightningstrikedensity_goes_time/MapServer/WMSServer", {
    layers: '1', // Specify lightning density product to be added to map
    format: 'image/png',
    transparent: true,
    attribution: "" // NOAA was previously cited, so attribution was left blank here
}).addTo(map);  // Add layer to map

// Create an object with layers for each basemap
var baseLayers = {
  "Base Map": baseMap
};

// Create controls for each map layer to provide option to toggle layer off/on
var overlays = {
  "GOES IR": goes,
  "Radar": radar,
  "Lightning": lightning
};

// Add controls to map
L.control.layers(baseLayers, overlays).addTo(map);

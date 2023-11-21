const mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const stadia = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const mapOptions = {
    center: [39.85306872153302, -101.69997201644105],
    zoom: 4,
    layers: [mapnik, stadia]
};

const map = new L.map('cluster-map', mapOptions);

const baseMaps = {
    "Stadia": stadia,
    "Mapnik": mapnik
};

const markers = new L.MarkerClusterGroup();

for (let point of campground) {
    const coordinate = point.geometry.coordinates;
    markers.addLayer(L.marker([coordinate[1], coordinate[0]]).bindPopup(`<a href="/campgrounds/${point._id}"><h5>${point.title}</h5></a><p>${point.location}</p>`));
};

map.addLayer(markers);

const overlayMaps = {
    "Campgrounds": markers
};

L.control.scale().addTo(map);

const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);



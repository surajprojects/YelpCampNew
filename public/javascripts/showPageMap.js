const coordinates = L.latLng(campground.geometry.coordinates[1], campground.geometry.coordinates[0]);

const mapnik = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// const stadia = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
//     minZoom: 0,
//     maxZoom: 20,
//     attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

const mapOptions = {
    center: coordinates,
    zoom: 4,
    // layers: [mapnik, stadia]
    layers: [mapnik]
};

const map = new L.map('map', mapOptions);

const baseMaps = {
    // "Stadia": stadia,
    "Mapnik": mapnik
};

L.control.scale().addTo(map);

const marker = L.marker(coordinates).addTo(map);

marker.bindPopup(`<h5>${campground.title}</h5><p>${campground.location}</p>`).openPopup();

const layerControl = L.control.layers(baseMaps).addTo(map);

















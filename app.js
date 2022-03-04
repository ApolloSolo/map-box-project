const mapKey = "pk.eyJ1IjoiYXBwc29sbyIsImEiOiJjbDA5dmptYWowaGcwM2lwOTY0dGxlOWp3In0.kulAfdlLVedrwX0Yh0qruQ";

const cities = ["Charlotte", "Sacramento", "Gustine", "Ashboro"]
let cityGeoJSON = [];

const cityToGeoData = async function (city) {
    const respons = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},US&appid=c20b708b2952fc5492619c70affe0677`
    );
    if (respons) {
      const lat = respons.data[0].lat;
      const lon = respons.data[0].lon;
      const geoData = [lon, lat];
      return geoData;
    } else {
      alert("Error with geo location");
    }
  };

const toGeoJSON = async function() {
    for(let i = 0; i < cities.length; i++){
        let data = await cityToGeoData(cities[i]);
        
        cityGeoJSON.push(data);
        console.log(data);

        if(i === cities.length - 1){
          buildMap();
        }
    }
    console.log(cityGeoJSON);
}

toGeoJSON();

function buildMap(){
  mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwc29sbyIsImEiOiJjbDA5dmptYWowaGcwM2lwOTY0dGxlOWp3In0.kulAfdlLVedrwX0Yh0qruQ';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-80.9, 35.2], // starting position [lng, lat]
    zoom: 5 // starting zoom
});

// Create a default Marker and add it to the map.

  for(let i = 0; i < cityGeoJSON.length; i++){
    let marker1 = new mapboxgl.Marker({ color: 'rgb(20, 200, 175)', rotation: 45 })
    .setLngLat(cityGeoJSON[i])
    .addTo(map);
  }
}
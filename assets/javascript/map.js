let restaurantIcon = L.icon({
  iconUrl: './assets/icons/gourmet_0star.png',
  iconSize:     [40, 40], 
  iconAnchor:   [20, 0], 
  popupAnchor:  [0,0] 
});

let  beachIcon = L.icon({
  iconUrl: './assets/icons/beach_icon.png',
  iconSize:     [40, 40], 
  iconAnchor:   [20, 0], 
  popupAnchor:  [0, 0] 
});

let  museumIcon = L.icon({
  iconUrl: './assets/icons/museum.png',
  iconSize:     [40, 40], 
  iconAnchor:   [20, 0], 
  popupAnchor:  [0, 0] 
});

let  currentPositionIcon = L.icon({
  iconUrl: './assets/icons/posicion.png',
  iconSize:     [40, 40], 
  iconAnchor:   [20, 0], 
  popupAnchor:  [0, 0]
})

/**
 * Asynchronous function to obtain the user's geographic location.
 * @returns {Promise<Array<number>>} A promise that resolves with an array [latitude, longitude].
 */
const getGeoLocation = async () => {
  return new Promise((resolve, reject) => {
      // Configuration options for location retrieval
      const options = {
          enableHighAccuracy: true,  // Habilita la alta precisión
          timeout: 1000,  // Maximum time to obtain location (in milliseconds)
          maximumAge: 0,  // Maximum location cache age
      };
      // Success callback when location is obtained
      const success = (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          resolve([lat, lon]); // Resolve the promise with an array [latitude, longitude]
      };
      // Error callback when there is an issue obtaining the location
      const error = (msg) => {
          // Reject the promise with the provided error message
          reject(msg);
      };
      // Get the user's current location using the navigator.geolocation object
      navigator.geolocation.getCurrentPosition(success, error, options);
  });
}

/**
 * Asynchronous function to fetch data from a URL.
 * @param {string} url - The URL from which to fetch data.
 * @returns {Promise<Object>} A promise that resolves with the fetched data.
 */
const getData = async (url) => {
  let data = await fetch(url)
  let restaurants = await data.json()
  return restaurants
}

window.addEventListener('DOMContentLoaded', async () => {
  // const current = await getGeoLocation();
  const restaurants = await getData('./assets/json/food.json');
  const beaches = await getData('./assets/json/beachs.json');
  const museums = await getData('./assets/json/museums.json');

  const position = await getGeoLocation();
  // console.log(prueba)
  // console.log(typeof restaurants)
  // Create a Leaflet map centered on the user's position
  let map = L.map('map').setView([position[0],position[1]],18);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);
  // Add a marker for the user's current position
  L.marker([position[0],position[1]], {icon: currentPositionIcon}).addTo(map)
  let group = []
  console.log(Object.keys(restaurants).length)
  for(let clave in restaurants){
      if(restaurants[clave]['web'] !=''){
          
          if(restaurants[clave]['stars'] == 2){
              console.log(restaurants[clave]['stars'])
              restaurantIcon = L.icon({ iconUrl: './assets/icons/gourmet_2stars.png' });
          } else if(restaurants[clave]['stars'] == 1) {
              restaurantIcon = L.icon({ iconUrl: './assets/icons/gourmet_1star.png' });
          } else if(restaurants[clave]['stars'] == 0){
              restaurantIcon = L.icon({ iconUrl: './assets/icons/gourmet_0star.png' });
          }
          group.push(L.marker([restaurants[clave]['lat'],restaurants[clave]['lon']], {icon: restaurantIcon}).addTo(map)
      .bindPopup(`${restaurants[clave]['name']} </br> ${restaurants[clave]['location']} </br> <a href="${restaurants[clave]['web']}" target="_blank">${restaurants[clave]['name']}</a>`))
      } else{
          restaurantIcon = L.icon({ iconUrl: './assets/icons/gourmet_0star.png' });
          group.push(L.marker([restaurants[clave]['lat'],restaurants[clave]['lon']], {icon: restaurantIcon}).addTo(map)
      .bindPopup(`${restaurants[clave]['name']} </br> ${restaurants[clave]['location']}`))
      }
      
  }
  console.log(group.length)
  
  let restaurantLayer = L.layerGroup(group)
  group = []
  for(let clave in beaches){
      group.push(L.marker([beaches[clave]['lat'],beaches[clave]['lon']], {icon: beachIcon}).addTo(map)
      .bindPopup(`${beaches[clave]['name']} </br> `))
  }
  let beachLayer = L.layerGroup(group) 
  group = []
  for(let clave in museums){
      group.push(L.marker([museums[clave]['lat'],museums[clave]['lon']], {icon: museumIcon}).addTo(map)
      .bindPopup(`${museums[clave]['name']} </br> `))
  }
  let museumLayer = L.layerGroup(group) 

  let overlayMaps = {
    "Restaurnat": restaurantLayer,
    "Beach": beachLayer,
    "Museum": museumLayer
};

var layerControl = L.control.layers(overlayMaps).addTo(map);
  //Add legend

  L.control.Legend({
      position: "bottomright",
      collapsed: true,
      column: 1,
      legends: [{
          label: "Restaurant",
          type: "image",
          url: "./assets/icons/gourmet_0star.png",
          layers: [restaurantLayer],
          inactive: false
      },
      { label: "Beach",
      type: "image",
      url: "./assets/icons/beach_icon.png",
      layers: beachLayer,
      inactive: false
  },
  { label: "Museum",
  type: "image",
  url: "./assets/icons/museum.png",
  layers: museumLayer,
  inactive: false
}]
  }).addTo(map);

  let center = document.getElementById('center')
  center.addEventListener('click', () => {
    map.setView([43.362014825626254,-5.850953691346048],10);
    // restaurantLayer.remove()
  })

})





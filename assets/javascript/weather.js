// Days
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// API key for weather data retrieval
const key = '0f58f193d7be4365a50193908231008';

// List of cities for weather information
let cities = ['oviedo', 'gijon'];

// Function to gelocate user
// Función asincrónica para obtener la ubicación geográfica del usuario
const getGeoLocation = async () => {
  return new Promise((resolve, reject) => {
    // Opciones de configuración para la obtención de la ubicación
    const options = {
      enableHighAccuracy: true,  // Habilitar alta precisión
      timeout: 1000,             // Tiempo máximo para obtener la ubicación (en milisegundos)
      maximumAge: 0,             // Edad máxima de la caché de la ubicación
    };

    // Función de éxito que se llama cuando se obtiene la ubicación
    const success = (position) => {
      const lat = position.coords.latitude;    // Obtener latitud
      const lon = position.coords.longitude;   // Obtener longitud
      resolve([lat, lon]);                    // Resuelve la promesa con [latitud, longitud]
    };

    // Función de error que se llama cuando hay un problema al obtener la ubicación
    const error = (msg) => {
      reject(msg);  // Rechaza la promesa con el mensaje de error proporcionado
    };

    // Obtener la ubicación actual del usuario utilizando la API Geolocation
    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}


// Función asincrónica para obtener la información climática actual
const getCurrentWeather = async () => {
  // Obtener las coordenadas de la ubicación actual utilizando la función getGeoLocation
  let coordinates = await getGeoLocation();
  // Construir la URL para la solicitud de API utilizando las coordenadas obtenidas y la clave API
  let url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${coordinates[0]},${coordinates[1]}&aqi=no`;

  // Realizar la solicitud de API utilizando fetch
  const data = await fetch(url);

  // Convertir la respuesta a formato JSON
  const weather = await data.json();

  // Devolver la información climática actual en formato JSON
  return weather;
}


// Function to fetch weather data asynchronously

// Función asincrónica para obtener los datos climáticos de una ciudad
const getDataWeather = async (city) => {
  // Construir la URL para la solicitud de API utilizando la clave y la ciudad proporcionadas
  let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=5&aqi=no&alerts=no`;

  // Realizar la solicitud de API utilizando fetch
  const data = await fetch(url);

  // Convertir la respuesta a formato JSON
  const weather = await data.json();

  // Devolver los datos climáticos en formato JSON
  return weather;
}


// Function to display weather condition images for a city
const showImage = (data,city) => {
  let i =1;
  let images = document.getElementsByClassName(city);
  for(let image of images){
    image.style.backgroundImage = `url(${data.forecast['forecastday'][i]['day']['condition']['icon']})` 
    i++;
  }
}

// Function to display weather information for a city
// Función para mostrar la información de pronóstico en los elementos de la interfaz
const showInfo = (data, city, days) => {
  let i = 1; // Variable para controlar el índice del pronóstico
  let date = new Date(); // Objeto de fecha actual
  let clase = 'info-' + city; // Clase CSS específica para cada ciudad
  let daysBox = document.getElementsByClassName(clase); // Obtener elementos con la clase específica

  // Iterar a través de los elementos de pronóstico en la interfaz
  for (let day of daysBox) {
    if (date.getDay() + i < 7) { // Comprobar si el día actual + i es menor que 7 (días de la semana)
      day.innerHTML = `${days[date.getDay() + i]} <br>
      <p>${data.forecast['forecastday'][i]['day']['avgtemp_c']} °C</p>`;
    } else { // Si se excede el índice de días de la semana, volver a empezar desde el principio
      day.innerHTML = `${days[(date.getDay() + i) - 7]} <br>
      <p>${data.forecast['forecastday'][i]['day']['avgtemp_c']} °C</p>`;
    }
    i++; // Incrementar el índice para acceder al siguiente día de pronóstico
  }
}

// Function to display current weather information for the current position
// Función para mostrar la información actual en la interfaz
const showCurrentInfo = (data) => {
  // Obtener la fecha y hora actual
  let date = new Date();
  // Obtener el nombre del día de la semana correspondiente
  let day = days[date.getDay()]; // Asegúrate de que la variable 'days' esté definida previamente
  let image = document.getElementById('image');
  // Establecer la imagen de fondo utilizando el icono proporcionado en los datos
  image.style.backgroundImage = `url(${data.current['condition']['icon']})`;
  let d = document.getElementById('day');
  // Mostrar el nombre de la ubicación y el día de la semana
  d.innerHTML = ` ${data.location['name']}<br>
                  ${day}`;
  // Mostrar la fecha
  let currentDate = document.getElementById('date');
  currentDate.innerHTML = `${date.getDate()} - ${date.getMonth()+1} - ${date.getFullYear()}`;
  // Mostrar la temperatura, el viento y la humedad
  let temperature = document.getElementById('temp');
  let wind = document.getElementById('wind');
  let humidity = document.getElementById('cloud');
  temperature.innerText = ` ${(data.current['temp_c'])} °C`;
  wind.innerHTML = ` ${data.current['wind_kph']} km/h`; 
  humidity.innerHTML = ` ${data.current['humidity']}%`;
}

// Esperar a que se cargue completamente el contenido del DOM
window.addEventListener('DOMContentLoaded', async () => {
  // Obtener la información climática actual de la posición actual y mostrarla
  const current = await getCurrentWeather();
  showCurrentInfo(current);
  console.log(current); // Mostrar información actual en la consola

  // Iterar a través de cada ciudad para obtener y mostrar los datos climáticos
  for (city of cities) {
    // Obtener los datos climáticos para la ciudad actual
    let data = await getDataWeather(city);
    // Mostrar la imagen del clima correspondiente a la ciudad
    showImage(data, city);
    // Mostrar información detallada de pronóstico para la ciudad
    showInfo(data, city, days);
  }
})

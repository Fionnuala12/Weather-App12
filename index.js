function formatDate(){
  
  let year = now.getFullYear(); 
  let dates = now.getDate();
  let hour = now.getHours();
  if (hour < 10){
    hour = `0${hour}`;
  }
  let minuets = now.getMinutes();
  if (minuets < 10){
    minuets = `0${minuets}`;
  }

  let days = [ "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]; 
  let day = days[now.getDay()]; 

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let month = months[now.getMonth()];

  dateTime.innerHTML = `${day}, ${dates} ${month}, ${year} <br /> ${hour}:${minuets}`;
}

let now = new Date(); 
let dateTime = document.querySelector("#date-time")
formatDate();


function citySearch(event) {
event.preventDefault();
let cityElement = document.querySelector("#city"); 
let searchInput = document.querySelector("#city-name"); 
cityElement.innerHTML = searchInput.value;
let units = "metric";
let apiKey = "06c9d19d30f0be8b128071a6b5e0aeb3";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}`;

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("#search-engine"); 
form.addEventListener("submit", citySearch);


function getCurrentPosition(){
navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "06c9d19d30f0be8b128071a6b5e0aeb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = (response.data.name);
  let wind = Math.round(response.data.wind.speed);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temperature}°C`;
  let cityName = document.querySelector("#city");
  cityName.innerHTML = city;
  let windSpeed = document.querySelector("#wind-speed"); 
  windSpeed.innerHTML = wind;
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentPosition);
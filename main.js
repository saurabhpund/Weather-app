'use strict';
let search = document.getElementById("submit"),
  input = document.getElementById("city-input"),
  temp = document.getElementById("temp"),
  humidity = document.getElementById("humidity"),
  pressure = document.getElementById("pressure"),
  maxTemp = document.getElementById("max"),
  minTemp = document.getElementById("min"),
  weather_icon = document.getElementById("icon"),
  weather_condition = document.getElementById("condition"),
  country = document.getElementById("country"),
  city_name = document.getElementById("city-name"),
  background_img = document.body.style.background,
  hour = document.getElementById("hour"),
  visibility = document.getElementById('visibility'),
  minute = document.getElementById("minute");

  if(!navigator.onLine) {
  alert("Seems like your are offline... Check your connection");
  document.body.style.display = "None";
}

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    getData();
  }
});
/* ********************************Functions***************************************************** */

function getData() {
  // * Get Request
  let city = input.value;
  if (city !== null || city !== "") {
    const key = "3de4a149febc036e4f9a1abf070dbb2e";
    let req = new XMLHttpRequest();
    req.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    );
    req.send();

    req.onload = () => {
      if (req.status <= 400) {
        let response = JSON.parse(req.responseText);
        linkData(response);
      } else {
        switch (req.status) {
          case 404:
            alert("Please check the spelling");
            break;

          default:
            break;
        }
      }
    };
  }
}

function linkData(data) {
  let [image, state] = isDayorNight(data.sys.sunrise, data.sys.sunset);
  let [condition, img] = icon(
    data.weather[Math.floor(Math.random() * data.weather.length)].main,
    state
    );
  maxTemp.innerHTML = convertTemp(data.main.temp_max) + "°C";
  minTemp.innerHTML = convertTemp(data.main.temp_min) + "°C";
  humidity.innerHTML = data.main.humidity + "%";
  weather_condition.innerHTML = condition;
  pressure.innerHTML = data.main.pressure + " mBar";
  country.innerHTML = data.sys.country;
  city_name.innerHTML = data.name;
  weather_icon.src = img;
  document.body.style.background = `url('${image}')`;
  temp.innerHTML = convertTemp(data.main.temp);
  visibility.innerHTML = (data.visibility / 1000) + " Km";
}

function convertTemp(temp) {
  return (temp - 273.15).toFixed(0);
}

function icon(cond, state) {
  let img = () => {
    if (state == "Day") {
      switch (cond) {
        case "Haze":
          return "./Images/sun/Haze.png";

        case "Clouds":
          return "./Images/sun/Cloudy.png";

        case "Fog":
          return "./Images/sun/Fog.png";

        case "Rain":
          return "./Images/sun/Rain.png";

        case "Snow":
          return "./Images/sun/Snow.png";

        case "Mist":
          return "./Images/sun/Mist.png";
        default:
          return "./Images/sun/Clear.png";
      }
    } else {
      switch (cond) {
        case "Haze":
          return "./Images/moon/Haze.png";

        case "Clouds":
          return "./Images/cloud/Clouds.png";

        case "Fog":
          return "./Images/sun/Fog.png";

        case "Drizzle":
          return "./Images/moon/Drizzle.png";

        case "Rain":
          return "./Images/sun/Rain.png";

        case "Snow":
          return "./Images/sun/Snow.png";

        case "Mist":
          return "./Images/moon/Mist.png";

        case "Thunderstorm":
          return "./Images/moon/ThunderStorm.png";

        default:
          return "./Images/moon/Clear.png";
      }
    }
  };

  return [cond, img()];
}

function isDayorNight(sunR, sunS) {
  let currentTime = Math.floor(new Date().getTime() / 1000);
  return sunR < currentTime && currentTime < sunS
    ? ["./Images/Day.png", "Day"]
    : ["./Images/Night.png", "Night"];
}

/* ************************************************************************************************ */

window.onload = function () {
  const key = "3de4a149febc036e4f9a1abf070dbb2e";
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${key}`
  );
  req.send();
  req.onload = () => {
    if (req.status <= 400) {
      let response = JSON.parse(req.responseText);
      linkData(response);
    }
    else{
      document.body.style.display = 'None';
    }
  };
};

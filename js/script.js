window.addEventListener("DOMContentLoaded", () => {
  const api = {
    key: "7ef38fc86fa881091fa21e967c65712a",
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  };

  const searchBox = document.querySelector(".search-box");

  searchBox.addEventListener("keyup", setQuery);

  function setQuery(e) {
    if (e.keyCode == 13) {
      getResults(searchBox.value);
      console.log(searchBox.value);
    }
  }

  function getResults(query) {
    fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResults);
  }

  function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let hiLow = document.querySelector(".hi-low");
    hiLow.innerHTML = `
      ${Math.round(weather.main.temp_min)}°c /
      ${Math.round(weather.main.temp_max)}°c`;
  }

  function dateBuilder(i) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[i.getDay()];
    let date = i.getDate();
    let month = months[i.getMonth()];
    let year = i.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
  }
});

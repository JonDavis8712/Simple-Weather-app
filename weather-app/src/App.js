import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherIcon from "./WeatherIcon";


class icon extends React.Component {
  constructor() {
    super();
        this.state = {
         currentIcon: "01d"
        };
}
changeIcon = (newIcon) => {
  this.setState({
      currentIcon: newIcon
    });
}

render() {
  const { currentIcon } = this.state;

  return (
      <div>
        <WeatherIcon icon={currentIcon} />
      </div>
  );
};
}


function App() {
  const apiKey = "8de7057cf85dd26879c48952b55072af";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const fetchWeather = (event) => {
    if (event.key === "Enter" && city !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => { 
          setWeatherData(data)
          setNewIcon(data.weather[0].icon || "");
        })
        .catch((err) => alert("Your city not found")); 
        
    }
   

    const setWeatherData = (data) => {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      const { timezone } = data;
      const { dt } = data;
      const { sunrise } = data.sys;
      const { sunset } = data.sys;

      const dateTime = new Date(dt * 1000);
      const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
      const currentLocalTime = toUtc + 1000 * timezone;
      const selectedDate = new Date(currentLocalTime);

      const date = selectedDate.toLocaleString("en-US", {
        day: "numeric",
        weekday: "long",
        month: "long",
      });
      const year = selectedDate.toLocaleString("en-US", {
        year: "numeric",
      });
      const hour = selectedDate.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      document.querySelector(".city").innerText =
        "The Weather in " + name + " is:";
      document.querySelector(".temperature").innerText =
        Math.floor(temp) + "°F";
      document.querySelector(".description").innerText =
        description.toUpperCase();
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind Speed: " + Math.floor(speed) + "mph";
      document.querySelector(".time").innerText = `${date} ${year} ${hour}`;
      document.querySelector(".weather").classList.remove("loading");
    };
  };

  return (
    <div className="card">
      <p className="title">Just Tell me The Weather...</p>
      <h2 className="city">Search a City</h2>
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="search by city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={fetchWeather}
        />
        <button
          className="enter"
          onClick={() => {
            if (city !== "") {
              fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
              )
                .then((res) => res.json())
                .then((data) => setWeatherData(data))
                .catch((err) => alert("Your city not found"));
                const setWeatherData = (data) => {
                const { name } = data;
                const { icon, description } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                const { timezone } = data;
                const { dt } = data;
                const { sunrise } = data.sys;
                const { sunset } = data.sys;

                const dateTime = new Date(dt * 1000);
                const toUtc =
                  dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
                const currentLocalTime = toUtc + 1000 * timezone;
                const selectedDate = new Date(currentLocalTime);

                const date = selectedDate.toLocaleString("en-US", {
                  day: "numeric",
                  weekday: "long",
                  month: "long",
                });
                const year = selectedDate.toLocaleString("en-US", {
                  year: "numeric",
                });
                const hour = selectedDate.toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                document.querySelector(".city").innerText =
                  "The Weather in " + name + " is:";
                document.querySelector(".temperature").innerText =
                  Math.floor(temp) + "°F";
                document.querySelector(".description").innerText =
                  description.toUpperCase();
                document.querySelector(".humidity").innerText =
                  "Humidity: " + humidity + "%";
                document.querySelector(".wind").innerText =
                  "Wind Speed: " + Math.floor(speed) + "mph";
                document.querySelector(
                  ".time"
                ).innerText = `${date} ${year} ${hour}`;
                document.querySelector(".weather").classList.remove("loading");
              };
            }
          }}
        >
          <svg
            className="icon"
            stroke="none"
            fill="currentColor"
            strokeWidth=".5"
            viewBox="0 -3 24 24"
            height="2em"
            width="2em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"></path>
            <path d="M11.412,8.586C11.791,8.966,12,9.468,12,10h2c0-1.065-0.416-2.069-1.174-2.828c-1.514-1.512-4.139-1.512-5.652,0 l1.412,1.416C9.346,7.83,10.656,7.832,11.412,8.586z"></path>
          </svg>
        </button>
      </div>
      <div className="weather is loading">
        <div className="flex">
          <h1 className="temperature"></h1>
          <WeatherIcon icon={newIcon} />
        </div>
        <div className="results">
          <div className="description">
            What's the weather?
          </div>
          <div className="wind"></div>
          <div className="humidity"></div>
          <div className="time"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

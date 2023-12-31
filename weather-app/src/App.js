import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherIcon from "./WeatherIcon";
import Typo from "typo-js";

const dictionariesDirectory = 'dictionaries';
const dictionaryFileName = 'en_US.dic';
const affixFileName = 'en_US.aff';
const iconMapping =  {
"02d": "https://lh3.googleusercontent.com/FSHoUidPh2Pw7aNCnbuXKIzOywpWEgsoirVu6-zDVmwOZBgqHrzlRZzxNjXxomvjP-183FoZZElCdGGfgrXHxhApxkk2boktFYKTWin4apoWf0hIQvV53Dxs7fNhdnCb0_y0YEY6zg=s256-p-k",
"01d": "https://lh3.googleusercontent.com/CVm25tt39p5RDIDhqPo13J2d4CMqXEHt-fqO0tU_k0iYkQxzaZ4LTMIg0RSHXqLw26QAYOMFxfVAjstt0CH7wTZD2w6ZJx9sZR4PjX8-i0-wy-Xfa5wiRn4iDBN1CQCLO5Y8vyKpaA=s256-p-k",
"01n": "https://lh3.googleusercontent.com/dgNBgb-P9BcUfPxAoadF-SW2NdtHvYQs78fkTcFICgVvU7qA-Aygd-Q2GgHx983Atqp37dYaUHsKYXSS0l38OrZiHv_dKigfTRNoocWDIw__rAKi6Gx1Lu8wB43BDuefR67uk4mddA=s256-p-k",
"02n": "https://lh3.googleusercontent.com/IviLsxiGvw2xZDgElIx9g1rWqpUWya1rzfPsk2fKZSbTM9WsrtphJPHfwafejPi4IRZDPyDK8Bx8veRZUUOJdR47wlZBN7ZZRihuxKvunWxwPBE0-kt1IoYJ_EhAbRUf8sClpTVuKQ=s256-p-k",
"03d": "https://lh3.googleusercontent.com/b469shsDxP9_S574ps6TrQgC5EcVD3REqOqte_ZIuPClcZ3PNLBfbq4jqp29m-K5SYdAMIvRoEODwy6v7xBtm3nSjnRUOyoAZ28CAsJv5hiHS-tA4ADBUbgoxFHmXEeAkk5qqZrpow=s256-p-k",
"03n": "https://lh3.googleusercontent.com/b469shsDxP9_S574ps6TrQgC5EcVD3REqOqte_ZIuPClcZ3PNLBfbq4jqp29m-K5SYdAMIvRoEODwy6v7xBtm3nSjnRUOyoAZ28CAsJv5hiHS-tA4ADBUbgoxFHmXEeAkk5qqZrpow=s256-p-k",
"04d": "https://lh3.googleusercontent.com/O8oyDPBEV97T0uIHkUvSWvoJfMn2TepfesbsTZs-ez5MtduAoVngnyzThEKeMaw49oBQoyUPl5R74vz9QB8JTMRm2wTwEU8FqSKiayYdxVOWRTTb7peEkNJ4VLFD2aX-1E3QsplTXw=s256-p-k",
"04n": "https://lh3.googleusercontent.com/O8oyDPBEV97T0uIHkUvSWvoJfMn2TepfesbsTZs-ez5MtduAoVngnyzThEKeMaw49oBQoyUPl5R74vz9QB8JTMRm2wTwEU8FqSKiayYdxVOWRTTb7peEkNJ4VLFD2aX-1E3QsplTXw=s256-p-k",
"09d": "https://lh3.googleusercontent.com/NO53na83olxa61LXPHIAsrBOjs38wCyebP4uTvN77gskBMUO4Mlz2ZiUiAtSQcfpJJIyFD5wkT8Gg438afpxVwcHSX6JhYuCGu6NMlv-uhxoEy0TlEhlah05roYnEN2XHmjmZLyrFg=s256-p-k",
"09n": "https://lh3.googleusercontent.com/NO53na83olxa61LXPHIAsrBOjs38wCyebP4uTvN77gskBMUO4Mlz2ZiUiAtSQcfpJJIyFD5wkT8Gg438afpxVwcHSX6JhYuCGu6NMlv-uhxoEy0TlEhlah05roYnEN2XHmjmZLyrFg=s256-p-k",
"10d": "https://lh3.googleusercontent.com/2JTkHUHHw1X3XTEsKzoZINr0sY3ovmxjQU1FWLu9bsKMIbR0SYXpLpRCDKoLUkeyv2yoxsx14EddyedQgQrLPuvCXNe52CdZIGuQCLqwk91G2wO8-ry_L81hwC--menjkgawlUvk_g=s256-p-k",
"10n": "https://lh3.googleusercontent.com/uEZWIHLEcaiIsA5hL1cWAW0AmyeT43u5_jAN4-tdAw4nV8lugZ34kit0f3pWcrXS8sVPKACkO7yLH6xA2TmFujhDt1TmLrs9iRPIikjCrenzPdarcP9ntezrkLRwedaJOFMSzyqppQ=s256-p-k",
"11d": "https://lh3.googleusercontent.com/89BbiQUPrg3b0wLGRUJvv9RJUJzobE6sDjNeAVneqCFO3ct0aI7ctyS78ol5Z8SvkvPbC-CjWuuo_3jl0caPzkjGJ1_FwS7FQ1K6qX3K0dHbL87TZfBnxxFjs7MlYO3phPg69d3eHA=s256-p-k",
"11n": "https://lh3.googleusercontent.com/89BbiQUPrg3b0wLGRUJvv9RJUJzobE6sDjNeAVneqCFO3ct0aI7ctyS78ol5Z8SvkvPbC-CjWuuo_3jl0caPzkjGJ1_FwS7FQ1K6qX3K0dHbL87TZfBnxxFjs7MlYO3phPg69d3eHA=s256-p-k",
"13d": "https://lh3.googleusercontent.com/6ifd3kbEP93pZh_a7WoAL0T_9SZW1zBER1o8sNVrBQyNgnC1tavW7IC3e3I_bRLy4YCl82bpGSRVO1K3dLpNitQ9i-Xa-PG2jrWVq6jT5TUPm4c-88Vy_kRSctKQ2cUfFSW_XTlr3A=s256-p-k",
"13n": "https://lh3.googleusercontent.com/xhqwxuqnpDZnq0brMQft-P9QSq6v18DAYPTGC25mHdm8Nwqo281w7kIf6O4h-1l8zRSxWCVr9AZtb-8KzLD6bDESx9VQPBJewbzEizAavlUUdkZHy-pu7To1nVYZfRWY1_jyJ_-Vjg=w2400",
"50n": "https://lh3.googleusercontent.com/F8oBwMSajM9tcSZxVtocfHCMIq8opp02KhUAIpqj8amvjGQHDv591Tki1ww91FMNYaZ3z4ZOua-jtQpUHBqRH__TPDVwj1owMb0sOuq0m8itvNYvrTJsw6nZy_06HoOY4S5EZGnUNQ=w2400",
"50d": "https://lh3.googleusercontent.com/F8oBwMSajM9tcSZxVtocfHCMIq8opp02KhUAIpqj8amvjGQHDv591Tki1ww91FMNYaZ3z4ZOua-jtQpUHBqRH__TPDVwj1owMb0sOuq0m8itvNYvrTJsw6nZy_06HoOY4S5EZGnUNQ=w2400"
};

const App = () => {
  const apiKey = "27393243df139c3d1a00f5ada98af28a";
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [suggestedWord, setSuggestedWord] = useState([]);
  const [dictionary, setDictionary] = useState(null);

  useEffect(() => {
    const dictionaryPath = `${process.env.PUBLIC_URL}/${dictionariesDirectory}/${dictionaryFileName}`;
    const affixPath = `${process.env.PUBLIC_URL}/${dictionariesDirectory}/${affixFileName}`;
    const typoDictionary = new Typo("en_US", dictionaryPath, affixPath);

    setDictionary(typoDictionary);
  }, []);

    const updateWeatherData = (data) => {
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

  const fetchWeather = (event) => {
    let correctedCity = city;
    if (event.key === "Enter" && city !== "") {
      const misspelledWords = dictionary.check(city);
      if (misspelledWords.length > 0) {
        let correctedCity = city;
        misspelledWords.forEach((word) => {
          const suggestions = dictionary.suggest(word);
          if (suggestions.length > 0) {
            correctedCity = correctedCity.replace(word, suggestions[0]);
          }
        });
        setCity(correctedCity);
      }
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${correctedCity}&units=imperial&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          updateWeatherData(data);
          const iconCode = data.weather[0].icon || "";
          const iconSource = iconMapping[iconCode] || "";
          setNewIcon(data.weather[0].icon || "");
          // setNewIcon(iconSource)
        })
        .catch((err) => alert("Your city not found"));
    }
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
                .then((data) => updateWeatherData(data))
                .catch((err) => alert("Your city not found"));
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
          <div className="description">What's the weather?</div>
          <div className="wind"></div>
          <div className="humidity"></div>
          <div className="time"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

function Search() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState();

  const handleData = (e) => {
    e.preventDefault();

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=7ecb5607daf4497983e221844241810&q=${search}&aqi=no&units=metric`
    )
      .then((response) => response.json())
      .then((finalres) => {
        console.log(finalres);

        if (finalres.error) {
          setWeather(undefined);
        } else {
          setWeather(finalres);
        }
      });

    setSearch("");
  };

  return (
    <div
      className="bg-[url('https://images.pexels.com/photos/108941/pexels-photo-108941.jpeg?auto=compress&cs=tinysrgb&w=600')]
                 bg-contain bg-no-repeat bg-top text-white min-h-screen"
    >
      <div className="pt-6 max-w-screen-md mx-auto">
        <h2 className="font-bold text-center text-2xl">
          <u className="text-black">Weather App</u>
        </h2>
        <form onSubmit={handleData}>
          <div className="flex justify-center items-center mt-4">
            <input
              type="search"
              placeholder="Search the City"
              className="border border-gray-300 w-full max-w-md p-3 text-xl text-black rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="mx-1 bg-blue-600 hover:bg-blue-700 p-3 text-white">
              Search
            </button>
          </div>
        </form>

        <div>
          {weather !== undefined ? (
            <div className="m-3 shadow-lg border py-4 px-6  text-black font-bold rounded-lg">
              <h2 className="text-2xl font-bold text-center mb-4">
                City: {weather.location.name}{" "}
                <span className="bg-yellow-400 px-2 py-1 rounded text-black">
                  IN
                </span>
              </h2>

              <div className="text-xl flex justify-between items-center mb-4">
                <div>
                  Temp: {weather.current.temp_c}
                  <sup>°</sup>C
                </div>
                <div>Cloud: {weather.current.cloud}%</div>
              </div>

              <div className="text-xl flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TiWeatherPartlySunny className="text-4xl" />
                  <span>{weather.current.condition.text}</span>
                </div>
                <div>{weather.location.region}</div>
              </div>
            </div>
          ) : (
            <p className="text-center my-6 font-bold text-2xl text-black">
              No data found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

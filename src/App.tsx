import { useEffect, useState } from "react";
import { ForecastType, OptionType } from "./types/types";
import "./App.css";
import Search from "./components/Search";

function App() {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [location, setLocation] = useState<OptionType | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);

  const getOptions = async (value: string) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);
    if (value === "") {
      setOptions([]);
      return;
    }
    getOptions(value);
  };

  const handleClickOption = (option: OptionType) => {
    setLocation(option);
  };

  useEffect(() => {
    if (location) {
      setInput(location.name);
      setOptions([]);
    }
  }, [location]);

  const getForecast = async (location: OptionType) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          location.lat
        }&lon=${location.lon}&appid=${import.meta.env.VITE_API_KEY}`
      );
      const data = await response.json();
      // const forecastData = {
      //   ...data,
      //   list: data.list.slice(0, 16),
      // };
      setForecast(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    if (!location) return;
    getForecast(location);
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center h-screen w-full">
        <Search
          input={input}
          handleChange={handleChange}
          options={options}
          handleClickOption={handleClickOption}
          handleClick={handleClick}
        />
        <div className="mt-10">
          {forecast ? (
            <section className="bg-amber-400 hover:bg-amber-300 border transition-colors border-amber-400 shadow-md p-10 rounded-md">
              <h2 className="text-2xl font-normal">
                {forecast.name},{" "}
                <span className="font-semibold">{forecast.sys.country}</span>
              </h2>
              <p className="text-base mt-0 text-center">
                {(forecast.main.temp - 273.15).toFixed(2)}&deg;C
              </p>
              <p className="text-lg mt-7 text-center font-bold">
                {forecast.weather[0].description.toUpperCase()}
              </p>
            </section>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

export default App;

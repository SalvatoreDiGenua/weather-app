import { useEffect, useState } from "react";
import { City } from "../../models/City";
import { CurrentCondition } from "../../models/CurrentCondition";
import { Forecasts } from "../../models/Forecasts";
import "./Body.scss";
import ForecastDetails from "./components/forecasts-details/ForecastDetails";
import {
  getCurrentConditions,
  getForecasts,
} from "../../services/weather.service";
import WeatherIcon from "../../shared/components/weather-icon/WeatherIcon";
import ForecastTopCities from "./components/forecasts-top-cities/ForecastTopCities";

function Body({ city }: { city: City | null }) {
  const [currentCondition, setCurrentCondition] =
    useState<CurrentCondition | null>(null);
  const [forecasts, setForecasts] = useState<Forecasts | null>(null);

  useEffect(() => {
    if (!city?.Key) {
      setCurrentCondition(null);
      setForecasts(null);
      return;
    }
    getCurrentConditions(city.Key).then(setCurrentCondition);
    getForecasts(city.Key).then(setForecasts);
  }, [city]);

  return (
    <>
      <div className="weather-body">
        {city && currentCondition && (
          <div className="weather-body__main">
            <WeatherIcon iconType={currentCondition.WeatherIcon} />
            <h1 className="weather-body__main-title">
              <span style={{ marginRight: "15px" }}>{city.LocalizedName}</span>
              {currentCondition.Temperature.Metric.Value + "°"}
              {currentCondition.Temperature.Metric.Unit}
            </h1>
            <h3 className="weather-body__main-subtitle">
              {currentCondition.WeatherText}
            </h3>
          </div>
        )}
        <div className="weather-body__forecasts">
          {forecasts ? (
            <ForecastDetails city={city} forecasts={forecasts} />
          ) : (
            <ForecastTopCities />
          )}
        </div>
      </div>
    </>
  );
}

export default Body;

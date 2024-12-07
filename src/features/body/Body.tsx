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
          <div className="weather-body__title">
            <h1>
              {city.Key} {currentCondition.Temperature.Metric.Value + "°"}
              {currentCondition.Temperature.Metric.Unit}
            </h1>
            <h3>{currentCondition.WeatherText}</h3>
          </div>
        )}
        <div className="weather-body__forecasts">
          {forecasts ? (
            <ForecastDetails city={city} forecasts={forecasts} />
          ) : (
            <div style={{ textAlign: "center" }}>Scegli una città</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Body;

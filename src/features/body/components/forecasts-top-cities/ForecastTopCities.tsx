import "./ForecastTopCities.scss";
import { useEffect, useState } from "react";
import { getTopCities } from "../../../../services/weather.service";
import { TopCity } from "../../../../models/TopCity";
import WeatherIcon from "../../../../shared/components/weather-icon/WeatherIcon";

function ForecastTopCities() {
  const [topCities, setTopCities] = useState<TopCity[]>(null);

  useEffect(() => {
    getTopCities().then(setTopCities);
  }, []);

  return (
    <>
      {topCities ? (
        <div className="forecasts-top-citites">
          <h1 className="forecasts-top-citites__title">
            {`Top ${topCities.length} Città`}
          </h1>
          <div className="forecasts-top-citites__carousel">
            {topCities.map((topCity) => (
              <div
                className="forecasts-top-citites__card"
                key={`top-city-${topCity.Key}`}
              >
                <div className="forecasts-top-citites__card-image">
                  <WeatherIcon iconType={topCity.WeatherIcon} />
                </div>
                <div className="forecasts-top-citites__card-title">
                  {topCity.LocalizedName}
                </div>
                {topCity.Temperature.Metric.Value}°
                {topCity.Temperature.Metric.Unit}
                <div className="forecasts-top-citites__card-subtitle">
                  {` ${topCity.WeatherText}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ fontSize: "30px" }}>Loading...</div>
      )}
    </>
  );
}

export default ForecastTopCities;

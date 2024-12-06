import { City } from "../../models/City";
import { CurrentCondition } from "../../models/CurrentCondition";
import { Forecasts } from "../../models/Forecasts";
import "./Body.scss";
import ForecastDetails from "./components/forecasts-details/ForecastDetails";

function Body({
  city,
  currentCondition,
  forecasts,
}: {
  city: City | null;
  currentCondition: CurrentCondition | null;
  forecasts: Forecasts | null;
}) {
  return (
    city &&
    currentCondition && (
      <>
        <div className="weather-body">
          <div className="weather-body__title">
            <h1>
              {city.name} {currentCondition.Temperature.Metric.Value + "°"}
              {currentCondition.Temperature.Metric.Unit}
            </h1>
            <h3>{currentCondition.WeatherText}</h3>
          </div>
          <div className="weather-body__forecasts">
            <ForecastDetails forecasts={forecasts} />
          </div>
        </div>
      </>
    )
  );
}

export default Body;

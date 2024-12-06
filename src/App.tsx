import { useEffect, useState } from "react";
import "./App.scss";
import Body from "./features/body/Body";
import Header from "./features/header/Header";
import { City } from "./models/City";
import { getCurrentConditions, getForecasts } from "./services/weather.service";
import { CurrentCondition } from "./models/CurrentCondition";
import { Forecasts } from "./models/Forecasts";

function App() {
  const [city, updateCity] = useState<City | null>(null);
  const [currentCondition, updateCurrentCondition] =
    useState<CurrentCondition | null>(null);
  const [forecasts, updateForecasts] = useState<Forecasts | null>(null);

  useEffect(() => {
    if (!city?.id) {
      updateCurrentCondition(null);
      updateForecasts(null);
      return;
    }
    getCurrentConditions(city.id).then(updateCurrentCondition);
    getForecasts(city.id).then(updateForecasts);
  }, [city]);

  return (
    <>
      <Header city={city} updateCityState={updateCity} />
      <Body
        city={city}
        currentCondition={currentCondition}
        forecasts={forecasts}
      />
    </>
  );
}

export default App;

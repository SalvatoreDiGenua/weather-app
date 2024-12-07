import { useEffect, useState } from "react";
import "./App.scss";
import Body from "./features/body/Body";
import Header from "./features/header/Header";
import { City } from "./models/City";
import { getCurrentConditions, getForecasts } from "./services/weather.service";
import { CurrentCondition } from "./models/CurrentCondition";
import { Forecasts } from "./models/Forecasts";

function App() {
  const [city, setCity] = useState<City | null>(null);
  const [currentCondition, setCurrentCondition] =
    useState<CurrentCondition | null>(null);
  const [forecasts, setForecasts] = useState<Forecasts | null>(null);

  useEffect(() => {
    if (!city?.id) {
      setCurrentCondition(null);
      setForecasts(null);
      return;
    }
    getCurrentConditions(city.id).then(setCurrentCondition);
    getForecasts(city.id).then(setForecasts);
  }, [city]);

  return (
    <>
      <Header city={city} updateCityState={setCity} />
      <Body
        city={city}
        currentCondition={currentCondition}
        forecasts={forecasts}
      />
    </>
  );
}

export default App;

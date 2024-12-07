import { useState } from "react";
import "./App.scss";
import Body from "./features/body/Body";
import Header from "./features/header/Header";
import { City } from "./models/City";

function App() {
  const [city, setCity] = useState<City | null>(null);

  return (
    <>
      <Header city={city} updateCityState={setCity} />
      <Body city={city} />
    </>
  );
}

export default App;

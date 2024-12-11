import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import "./Header.scss";
import { Menubar } from "primereact/menubar";
import { Dispatch, SetStateAction, useState } from "react";
import { City } from "../../models/City";
import { searchCity } from "../../services/weather.service";

function Header({
  city,
  updateCityState,
}: {
  city: City | null;
  updateCityState: Dispatch<SetStateAction<City | null>>;
}) {
  const [places, setPlacesState] = useState<City[]>([]);

  const handleSearchSuggestions = async (event: AutoCompleteCompleteEvent) => {
    const query = (event.query || "").toLocaleLowerCase();
    const cities = (await searchCity(query)) || [];
    setPlacesState(cities);
  };

  const handleAutoCompleteChange = (event: AutoCompleteChangeEvent) =>
    updateCityState(event.value);

  return (
    <>
      <div className="weather-header">
        <Menubar
          start={
            <h3 className="weather-header__title">
              <i className="pi pi-spin pi-sun" style={{ fontSize: "28px" }}></i>
              <span>Weather React App</span>
            </h3>
          }
          end={
            <AutoComplete
              field="LocalizedName"
              value={city}
              suggestions={places}
              placeholder="Cerca una città"
              completeMethod={handleSearchSuggestions}
              onChange={handleAutoCompleteChange}
            />
          }
          model={[]}
        />
      </div>
    </>
  );
}

export default Header;

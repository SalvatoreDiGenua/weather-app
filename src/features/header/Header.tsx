import {
  AutoComplete,
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
  const [places, updatePlacesState] = useState<City[]>([]);

  const searchPlaces = async (event: AutoCompleteCompleteEvent) => {
    const query = (event.query || "").toLocaleLowerCase();

    const cities = (await searchCity(query)) || [];
    updatePlacesState(() =>
      cities.map((el) => ({ name: el.LocalizedName, id: el.Key }))
    );
  };

  return (
    <>
      <div className="weather-header">
        <Menubar
          start={<h3>Weather React App</h3>}
          end={
            <AutoComplete
              field="name"
              value={city}
              suggestions={places}
              placeholder="Cerca una città"
              completeMethod={searchPlaces}
              onChange={(e) => updateCityState(e.value)}
            />
          }
        />
      </div>
    </>
  );
}

export default Header;

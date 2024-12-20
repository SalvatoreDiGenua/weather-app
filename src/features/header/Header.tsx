import { AutoComplete } from "primereact/autocomplete";
import "./Header.scss";
import { Menubar } from "primereact/menubar";
import { useState } from "react";
import { City } from "../../models/City";
import { searchCity } from "../../services/weather.service";
import { useDispatch } from "react-redux";
import { resetCityStore, setCityStore } from "../../redux/city/citySlice";
import { FormEvent } from "primereact/ts-helpers";

function Header() {
  const dispatch = useDispatch();
  const [places, setPlaces] = useState<City[]>([]);
  const [query, setQuery] = useState<string>("");

  const handleAutoCompleteChange = (event: FormEvent<City | string>) => {
    if (!event || !event.value) {
      setQuery("");
      dispatch(resetCityStore());
      return;
    }
    if (typeof event?.value === "string") {
      setQuery(event.value);
      searchCity(event.value).then(setPlaces);
      return;
    }
    setQuery(event.value.LocalizedName);
    dispatch(setCityStore(event.value));
  };

  const handleCompleteMethod = () => places;

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
              value={query}
              suggestions={places}
              placeholder="Cerca una città"
              completeMethod={handleCompleteMethod}
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

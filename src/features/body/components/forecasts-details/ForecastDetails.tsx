import "./ForecastDetails.scss";
import { DailyForecast, Forecasts } from "../../../../models/Forecasts";
import { DataView } from "primereact/dataview";
import { Divider } from "primereact/divider";
import { useEffect, useState } from "react";
import HourlyForecastDetails from "../hourly-forecasts-detail/HourlyForecastDetails";
import { City } from "../../../../models/City";
import { Button } from "primereact/button";
import { formatDateDay } from "../../../../shared/functions/formatDateDay";
import WeatherIcon from "../../../../shared/components/weather-icon/WeatherIcon";
import { getCityStore } from "../../../../redux/city/citySlice";
import { useSelector } from "react-redux";
import { WeatyherState } from "../../../../redux/weather-store";

function ForecastDetails({ forecasts }: { forecasts: Forecasts }) {
  const city: City = useSelector<WeatyherState>(getCityStore);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast>(null);

  useEffect(() => {
    if (!modalVisible) {
      setDailyForecast(null);
    }
  }, [modalVisible]);

  const handleOpenModal = (dailyForecasts: DailyForecast) => {
    setDailyForecast(dailyForecasts);
    setModalVisible(true);
  };

  const dailyForecastsTemplate = (dailyForecasts: DailyForecast[]) => {
    if (!dailyForecasts || dailyForecasts.length === 0) {
      return null;
    }
    return dailyForecasts.map((dailyForecast, index) => (
      <>
        <div className="forecast-detail" key={dailyForecast.Date}>
          <div className="forecast-detail__icon">
            <WeatherIcon iconType={dailyForecast.Day.Icon} />
          </div>
          <div className="forecast-detail__day">
            {formatDateDay(dailyForecast.Date)}
          </div>
          <div className="forecast-detail__temperature">
            <div className="forecast-detail__temperature-min">
              {dailyForecast.Temperature.Minimum.Value}°
            </div>

            <div className="forecast-detail__temperature-max">
              {dailyForecast.Temperature.Maximum.Value}°
            </div>
          </div>
          <div className="forecast-detail__action">
            <Button
              key={"button-" + dailyForecast.Date}
              icon="pi pi-chevron-right"
              onClick={() => handleOpenModal(dailyForecast)}
            />
          </div>
        </div>
        {index !== dailyForecasts.length - 1 && (
          <Divider key={"divider-" + dailyForecast.Date} />
        )}
      </>
    ));
  };

  return (
    <>
      {forecasts?.DailyForecasts && city && (
        <div className="wrap-forecasts-detail">
          <DataView
            className="wrap-forecasts-detail__data-view"
            value={forecasts?.DailyForecasts}
            listTemplate={dailyForecastsTemplate}
          />
          <HourlyForecastDetails
            cityKey={city.Key}
            dailyForecast={dailyForecast}
            modalVisible={modalVisible}
            updateModalVisible={setModalVisible}
          />
        </div>
      )}
    </>
  );
}

export default ForecastDetails;

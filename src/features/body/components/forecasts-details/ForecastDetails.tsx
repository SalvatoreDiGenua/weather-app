import "./ForecastDetails.scss";
import { DailyForecast, Forecasts } from "../../../../models/Forecasts";
import { DataView } from "primereact/dataview";
import { Divider } from "primereact/divider";
import { ReactNode } from "react";

function ForecastDetails({ forecasts }: { forecasts: Forecasts | null }) {
  const dailyForecastsTemplate = (dailyForecasts: DailyForecast[]) => {
    if (!dailyForecasts || dailyForecasts.length === 0) {
      return null;
    }
    return dailyForecasts.map((dailyForecast, index) => (
      <>
        <div className="forecast-detail" key={dailyForecast.Date}>
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
        </div>
        {index !== dailyForecasts.length - 1 && (
          <Divider key={"divider-" + dailyForecast.Date} />
        )}
      </>
    ));
  };

  const formatDateDay = (dateDay: string): string | ReactNode => {
    const dateDayObj = new Date(dateDay);
    if (new Date().getDay() === dateDayObj.getDay()) {
      return "Oggi";
    }
    return (
      <span style={{ textTransform: "capitalize" }}>
        {`
        ${dateDayObj.toLocaleDateString("default", {
          weekday: "long",
        })}
        ${dateDayObj.toLocaleDateString("default", {
          day: "numeric",
        })}
        `}
      </span>
    );
  };

  return (
    <>
      <div className="wrap-forecasts-detail">
        <DataView
          value={forecasts?.DailyForecasts}
          listTemplate={dailyForecastsTemplate}
        />
      </div>
    </>
  );
}

export default ForecastDetails;

import "./HourlyForecastDetails.scss";
import { DataView } from "primereact/dataview";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getHourlyForecast } from "../../../../services/weather.service";
import { HourlyForecast } from "../../../../models/HourlyForecast";
import { DailyForecast } from "../../../../models/Forecasts";
import { formatDateDay } from "../../../../shared/functions/formatDateDay";
import WeatherIcon from "../../../../shared/components/weather-icon/WeatherIcon";

function HourlyForecastDetails({
  cityKey,
  dailyForecast,
  modalVisible,
  updateModalVisible,
}: {
  cityKey: string | null;
  dailyForecast: DailyForecast | null;
  modalVisible: boolean;
  updateModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [hourlyForecasts, setHourlyForecasts] = useState<
    HourlyForecast[] | null
  >(null);

  useEffect(() => {
    if (!cityKey) {
      setHourlyForecasts(null);
      return;
    }
    getHourlyForecast(cityKey).then(setHourlyForecasts);
  }, [cityKey]);

  const hourlyForecastsTemplate = (
    detailsHourlyForecasts: HourlyForecast[]
  ) => {
    if (!detailsHourlyForecasts || detailsHourlyForecasts.length === 0) {
      return null;
    }
    return detailsHourlyForecasts.map((hourForecast, index) => (
      <>
        <div className="hourly-forecast-detail" key={hourForecast.DateTime}>
          <div className="hourly-forecast-detail__icon">
            <WeatherIcon iconType={hourForecast.WeatherIcon} />
          </div>
          <div className="hourly-forecast-detail__hour">
            {`${new Date(hourForecast.DateTime).getHours()}:00`}
          </div>
          <div className="hourly-forecast-detail__temperature">
            {hourForecast.Temperature.Value}°
          </div>
          <div className="hourly-forecast-detail__weather-detail">
            {hourForecast.IconPhrase}
          </div>
        </div>
        {index !== detailsHourlyForecasts.length - 1 && (
          <Divider key={"divider-" + hourForecast.DateTime} />
        )}
      </>
    ));
  };

  return (
    <>
      {hourlyForecasts && dailyForecast && (
        <Dialog
          header={formatDateDay(dailyForecast?.Date)}
          visible={modalVisible}
          onHide={() => {
            updateModalVisible(false);
          }}
          style={{ width: "800px", height: "600px" }}
          draggable={false}
        >
          <div className="wrap-hourly-forecasts-detail">
            <DataView
              value={hourlyForecasts}
              listTemplate={hourlyForecastsTemplate}
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default HourlyForecastDetails;

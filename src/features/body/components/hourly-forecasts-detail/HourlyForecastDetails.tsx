import "./HourlyForecastDetails.scss";
import { DataView } from "primereact/dataview";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getHourlyForecast } from "../../../../services/weather.service";

function HourlyForecastDetails({
  cityKey: idCity,
  modalVisible,
  updateModalVisible,
}: {
  cityKey: string | null;
  modalVisible: boolean;
  updateModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [hourlyForecasts, setHourlyForecasts] = useState<any[] | null>(null);

  useEffect(() => {
    if (!idCity) {
      setHourlyForecasts(null);
      return;
    }
    getHourlyForecast(idCity).then(setHourlyForecasts);
  }, [idCity]);

  const hourlyForecastsTemplate = (detailsHourlyForecasts: any[]) => {
    if (!detailsHourlyForecasts || detailsHourlyForecasts.length === 0) {
      return null;
    }
    return detailsHourlyForecasts.map((hourForecast, index) => (
      <>
        <div className="hourly-forecast-detail" key={hourForecast.Hour}>
          <div className="hourly-forecast-detail__hour">this is hour</div>
          <div className="hourly-forecast-detail__temperature">
            this is temperature
          </div>
        </div>
        {index !== detailsHourlyForecasts.length - 1 && (
          <Divider key={"divider-" + hourForecast.Date} />
        )}
      </>
    ));
  };

  return (
    <>
      {hourlyForecasts && idCity && (
        <Dialog
          visible={modalVisible}
          onHide={() => {
            updateModalVisible(false);
          }}
          style={{ width: "800px", height: "600px" }}
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

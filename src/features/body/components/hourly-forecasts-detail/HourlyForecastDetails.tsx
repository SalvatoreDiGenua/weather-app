import "./HourlyForecastDetails.scss";
import { DataView } from "primereact/dataview";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dispatch, SetStateAction } from "react";

function HourlyForecastDetails({
  hourlyForecasts,
  modalVisible,
  updateModalVisible,
}: {
  hourlyForecasts: [];
  modalVisible: boolean;
  updateModalVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const hourlyForecastsTemplate = (hourlyForecasts: any[]) => {
    if (!hourlyForecasts || hourlyForecasts.length === 0) {
      return null;
    }
    return hourlyForecasts.map((hourForecast, index) => (
      <>
        <div className="hourly-forecast-detail" key={hourForecast.Hour}>
          <div className="hourly-forecast-detail__hour">this is hour</div>
          <div className="hourly-forecast-detail__temperature">
            this is temperature
          </div>
        </div>
        {index !== hourlyForecasts.length - 1 && (
          <Divider key={"divider-" + hourForecast.Date} />
        )}
      </>
    ));
  };

  return (
    <>
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
    </>
  );
}

export default HourlyForecastDetails;

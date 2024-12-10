import "./WeatherIcon.scss";

const BASE_URL_ICON = "https://developer.accuweather.com/sites/default/files";

function WeatherIcon({ iconType }: { iconType: number }) {
  return (
    <>
      <div className="weather-icon">
        <img
          src={`${BASE_URL_ICON}/${iconType.toString().padStart(2, "0")}-s.png`}
          alt={`image-${iconType}`}
          style={{ width: "80px" }}
        />
      </div>
    </>
  );
}

export default WeatherIcon;

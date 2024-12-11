import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import "./ForecastTopCities.scss";
import { useEffect, useState } from "react";
import { getTopCities } from "../../../../services/weather.service";
import { TopCity } from "../../../../models/TopCity";
import WeatherIcon from "../../../../shared/components/weather-icon/WeatherIcon";
import { Card } from "primereact/card";

function ForecastTopCities() {
  const [topCities, setTopCities] = useState<TopCity[] | null>(null);

  useEffect(() => {
    getTopCities().then(setTopCities);
  }, []);

  const topCityTemplate = (topCity: TopCity) => {
    return (
      <>
        <div className="forecasts-top-citites-card">
          <Card
            header={<WeatherIcon iconType={topCity.WeatherIcon} />}
            title={topCity.LocalizedName}
            subTitle={`${topCity.Temperature.Metric.Value}° ${topCity.Temperature.Metric.Unit} ${topCity.WeatherText}`}
          ></Card>
        </div>
      </>
    );
  };

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1400px",
      numVisible: 10,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 8,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "350px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <>
      {topCities ? (
        <div className="wrap-forecasts-top-citites">
          <h1 className="wrap-forecasts-top-citites__title">
            {`Top ${topCities.length} Città`}
          </h1>
          <Carousel
            value={topCities}
            numVisible={10}
            numScroll={1}
            circular={true}
            itemTemplate={topCityTemplate}
            responsiveOptions={responsiveOptions}
          />
        </div>
      ) : (
        <div style={{ fontSize: "30px" }}>Loading...</div>
      )}
    </>
  );
}

export default ForecastTopCities;

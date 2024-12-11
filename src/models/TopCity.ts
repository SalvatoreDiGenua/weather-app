export interface TopCity {
  Key: string;
  LocalizedName: string;
  EnglishName: string;
  Country: Country;
  TimeZone: TimeZone;
  GeoPosition: GeoPosition;
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: any;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}

export interface Country {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
}

export interface TimeZone {
  Code: string;
  Name: string;
  GmtOffset: number;
  IsDaylightSaving: boolean;
  NextOffsetChange: any;
}

export interface GeoPosition {
  Latitude: number;
  Longitude: number;
  Elevation: Elevation;
}

export interface Elevation {
  Metric: Metric;
  Imperial: Metric;
}

export interface Metric {
  Value: number;
  Unit: string;
  UnitType: number;
}

export interface Temperature {
  Metric: Metric;
  Imperial: Metric;
}

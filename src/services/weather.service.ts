import { WEATHER_API_KEY } from "../constant/WEATHER_API_KEY"
import { WEATHER_BASE_API_URL } from "../constant/WEATHER_BASE_API_URL"
import { City } from "../models/City";
import { CurrentCondition } from "../models/CurrentCondition";
import { Forecasts } from "../models/Forecasts";

const WEATHER_SERVICE_CACHE: Record<string, Map<string, Promise<any>>> = {
  searchCity: new Map(),
  currentConditions: new Map(),
  forecasts: new Map(),
  hourlyForecasts: new Map()
};

export const searchCity = async (query: string): Promise<City[]> => {
  const cacheSearchCity = WEATHER_SERVICE_CACHE.searchCity.get(query);
  if (cacheSearchCity) {
    return new Promise((resolve) => resolve(cacheSearchCity));
  }
  const response = await fetch(buildApiUrl('locations/v1/cities/autocomplete', { q: query }), { cache: "force-cache" });
  const city = await response.json();
  WEATHER_SERVICE_CACHE.searchCity.set(query, city);
  return city;
}

export const getCurrentConditions = async (cityKey: string): Promise<CurrentCondition> => {
  const cacheCurrentCondition = WEATHER_SERVICE_CACHE.currentConditions.get(cityKey);
  if (cacheCurrentCondition) {
    return new Promise((resolve) => resolve(cacheCurrentCondition));
  }
  const response = await fetch(buildApiUrl(`currentconditions/v1/${cityKey}`), { cache: "force-cache" });
  const currentConditions = await response.json();
  WEATHER_SERVICE_CACHE.currentConditions.set(cityKey, currentConditions[0]);
  return currentConditions[0];
}

export const getForecasts = async (cityKey: string): Promise<Forecasts> => {
  const cacheForecasts = WEATHER_SERVICE_CACHE.forecasts.get(cityKey);
  if (cacheForecasts) {
    return new Promise((resolve) => resolve(cacheForecasts));
  }
  const response = await fetch(buildApiUrl(`forecasts/v1/daily/5day/${cityKey}`, { metric: 'true' }), { cache: "force-cache" });
  const forecasts = await response.json();
  WEATHER_SERVICE_CACHE.forecasts.set(cityKey, forecasts);
  return forecasts;
}

export const getHourlyForecast = async (cityKey: string): Promise<any> => {
  const cacheHourlyForecast = WEATHER_SERVICE_CACHE.hourlyForecasts.get(cityKey);
  if (cacheHourlyForecast) {
    return new Promise((resolve) => resolve(cacheHourlyForecast));
  }
  const response = await fetch(buildApiUrl(`forecasts/v1/hourly/12hour/${cityKey}`, { metric: 'true' }), { cache: "force-cache" });
  const hourlyForecast = await response.json();
  WEATHER_SERVICE_CACHE.hourlyForecasts.set(cityKey, hourlyForecast);
  return hourlyForecast;
}

const buildApiUrl = (endpoint: string, queryParams?: Record<string, string>): string | never => {
  if (endpoint.startsWith("/")) {
    throw new Error("the endpoint param must begin without '/'")
  }

  const apiUrl = new URL(`${WEATHER_BASE_API_URL}/${endpoint}`);
  apiUrl.searchParams.set('apikey', WEATHER_API_KEY);
  apiUrl.searchParams.set('language', 'it-IT');
  queryParams && Object.entries(queryParams).forEach(([key, value]: [string, string]) => apiUrl.searchParams.set(key, value));
  return apiUrl.href;
}
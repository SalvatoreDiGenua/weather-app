import { WEATHER_API_KEY } from "../constant/WEATHER_API_KEY"
import { WEATHER_BASE_API_URL } from "../constant/WEATHER_BASE_API_URL"
import { AccuWeatherCityAutocomplete } from "../models/AccuWeatherCity";
import { CurrentCondition } from "../models/CurrentCondition";

export const searchCity = async (city: string): Promise<AccuWeatherCityAutocomplete[]> => {
  const response = await fetch(buildApiUrl('locations/v1/cities/autocomplete', { q: city }));
  return response.json();
}

export const getCurrentConditions = async (idCity: string): Promise<CurrentCondition> => {
  const response = await fetch(buildApiUrl(`currentconditions/v1/${idCity}`));
  const currentConditions = await response.json()
  return currentConditions[0];
}

export const getForecasts = async (idCity: string): Promise<any> => {
  const response = await fetch(buildApiUrl(`forecasts/v1/daily/5day/${idCity}`, { metric: 'true' }));
  const forecasts = await response.json()
  return forecasts;
}

export const getHourlyForecast = async (idCity: string): Promise<any> => {
  const response = await fetch(buildApiUrl(`forecasts/v1/hourly/12hour/${idCity}`, { metric: 'true' }));
  const hourlyForecast = await response.json()
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
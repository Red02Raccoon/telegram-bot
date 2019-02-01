import * as constants from './config/const';
import { ENV } from "./config";

export const request = (latitude, longitude) => {
  return `${constants.WEATHER_URL}?units=metric&lat=${latitude}&lon=${longitude}&appid=${ENV.weather_key}`
}

export const formattedTime = (timeMS) => {
  const date = new Date(timeMS);

  return `${date.getHours()}:${date.getMinutes()}`
}

export const forecastMessage = (data) => {
  return (`Your city - <b>${data.name}</b>
Temperature is <b>${Math.round(data.main.temp)}</b>
Short description - <b>${data.weather[0].description}</b>
Sunrise - <b>${formattedTime(data.sys.sunrise)}</b>
Sunset - <b>${formattedTime(data.sys.sunset)}</b>
  `)
}


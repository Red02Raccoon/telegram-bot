import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  token: process.env.BOT_TOKEN,
  weather_key: process.env.WEATHER_KEY
}
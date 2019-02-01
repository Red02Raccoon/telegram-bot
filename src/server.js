import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

import { ENV } from "./config";
import * as utils from "./utils";
import * as constants from "./config/const";

var bot = new TelegramBot(ENV.token, {polling: true}); // Включить опрос сервера



const helloArr = ['hello', 'hi'];
const byArr = ['bye'];
const opts = {
  parse_mode : "HTML",
  "reply_markup": {
    // "one_time_keyboard": true,
    "resize_keyboard" : true,
    "keyboard": [
      [{text: "forecast", request_location: true }], 
      [{text: "Cancel"}]
    ]
  }
};

bot.on('message', (msg) => {
  console.log(msg)
  const {chat : { id }, text, location} = msg;

  if (text) {
    if (byArr.includes(text.toString().toLowerCase())) {
      bot.sendMessage(id, "Bye. Hope to see you around again. Have a nice day!");
    }
  
    if (helloArr.includes(text.toString().toLowerCase())) {
      bot.sendMessage(id,"Hello, " + "<b>" + msg.from.first_name + "</b>! Can I help you?", opts)
    } 
  }

  if (location) {
    const {location: {latitude, longitude}} = msg;

    axios.get(utils.request(latitude, longitude))
      .then(response => {
        bot.sendMessage(id, utils.forecastMessage(response.data), {parse_mode : "HTML"})
      })
      .catch(error => {
        console.log(error);
      });
  }

});

bot.onText(/\/start/, (msg) => {
  const {chat : { id }} = msg;

  bot.sendMessage(id, "Hello, " + "<b>" + msg.from.first_name + "</b>! =) Glad to see you! Can I help you?" , opts);
});

bot.on('polling_error', (error) => {
  console.log("error", error);  // => 'EFATAL'
});

//


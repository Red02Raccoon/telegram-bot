import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import mongoose from "mongoose";
import Friend from "./models/User-bd";

import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

import { ENV } from "./config";
import { URL, PORT, MONGO_URI } from "./config/const";
import * as utils from "./utils";

const bot = new TelegramBot(ENV.token); 
bot.setWebHook(`${URL}/bot`)

const app = new Koa();
const router = Router();

router.post('/bot', ctx => {
  const { body } = ctx.request;
  bot.processUpdate(body)
  ctx.status = 200;
});

app.use(bodyParser());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});

// db
mongoose
	.connect(MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log('connected'))
	.catch(err => console.log(err));

// bot 
const helloArr = ['hello', 'hi'];
const byArr = ['bye'];

const opts = {
  parse_mode : "HTML",
  "reply_markup": {
    "resize_keyboard" : true,
    "keyboard": [
      [{text: "forecast", request_location: true }], 
      [{text: "Cancel"}]
    ]
  }
};

bot.on('message', (msg) => {
  const {chat : { id }, text, location} = msg;

  if (text) {
    if (byArr.includes(text.toString().toLowerCase())) {
      bot.sendMessage(id, "Bye. Hope to see you around again. Have a nice day!");
    }
  
    if (helloArr.includes(text.toString().toLowerCase()) ) {
      bot.sendMessage(id,"Hello, " + "<b>" + msg.from.first_name + "</b>! Can I help you?", opts )
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

bot.onText(/\/sendpic/, (msg) => {
  const {chat : { id }} = msg;
  const imgUrl = "https://www.motherjones.com/wp-content/uploads/2018/06/blog_lunchtime_red_daisy_rain.jpg"

  bot.sendPhoto(id, imgUrl ,{ caption : `Some picture for you =)`} ); 
});

bot.onText(/\/setFriend (.+)/, (msg, match) => {
  const data = match[1].split('-')

  const newFriend = new Friend({
    name: data[0],
    date: data[1]
  });
  
  newFriend.save()

});

bot.on('polling_error', (error) => {
  console.log("error", error);  // => 'EFATAL'
});

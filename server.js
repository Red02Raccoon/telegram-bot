const { token } = require('./config');
var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot(token, {polling: true}); // Включить опрос сервера

bot.on('message', (msg) => {

  var hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(msg.chat.id,"Hello," + msg.from.first_name);
  } 
      
  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }

  var robot = "I'm robot";
  if (msg.text.indexOf(robot) === 0) {
      bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
  }

});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome");
});

bot.onText(/\/sendpic/, (msg) => {
  bot.sendPhoto(msg.chat.id,"https://marketplace.canva.com/MADGwM67DJw/5/thumbnail_large/canva-pink-petaled-flowers-closeup-photo-MADGwM67DJw.jpg", {caption : "Here we go ! \nThis is just a caption "} );  
});

bot.onText(/\/location/, (msg) => {
  // onText - работает в группах
  // message - нет

      bot.sendLocation(msg.chat.id,44.97108, -104.27719);
      bot.sendMessage(msg.chat.id, "Here is the point");
  
});
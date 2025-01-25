const express = require("express");
const app = express();

const KeepAlive = require("./keep_alive.js");


function keepAlive() {
  setInterval(() => {
    console.log("Sending ping request to keep bot alive...");
    fetch("http://localhost:3000") // Replace with your actual URL if on an external server
      .then(res => res.text())
      .then(text => console.log(text))
      .catch(err => console.error("Error with KeepAlive request:", err));
  }, 25000); // 25 seconds interval
}


app.listen(3000, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent, // Required for reading message content
  ],
});

client.on("messageCreate", (message) => {
  // Ignore bot's own messages to prevent infinite loops
  if (message.author.bot) return;

  console.log(`Received message: ${message.content}`);

  // Command Handling
  const command = message.content.trim().toLowerCase();

  if (command === "ping") {
    message.reply("pong");
  } else if (command === "hi murphy") {
    message.reply(
      responsestohi[Math.floor(Math.random() * responsestohi.length)],
    );
  } else if (command === "who are you murphy") {
    message.reply(
      responsestowru[Math.floor(Math.random() * responsestowru.length)],
    );
  } else if (message.content === "-credits") {
    message.reply("Created by K Mangalam, aka, not ImMortaL");
  }
});

const responsestohi = ["Hello there!", "Hey!", "What's up?", "Hello Master!"];

const responsestowru = [
  "I'm a bot, here to help!",
  "An AI Robot to here to enslave human kind",
  "I'm here to help you!",
  "A dragon looking fro the king who slaughetered me",
];

client.on("messageCreate", (message) => {
  if (message.content === "-credits") {
    message.reply("Created by K Mangalam, aka, not ImMortaL");
  }
});

keepAlive();
client.login(process.env.DISCORD_BOT_TOKEN);

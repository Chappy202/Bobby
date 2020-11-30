const { Command } = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

module.exports = class SkipCommand extends Command {
  constructor() {
    super("skip", {
      aliases: ["skip", "skip-song", "advance-song"],
      category: "Music",
      description: { content: "Skip the current playing song" },
      guildOnly: true
    });
  }

  exec(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      let embed = new MessageEmbed()
      .setTitle(`No user found in voice channel`)
      .setColor(`#f26666`)
      .setDescription(`Join a voice channel and try again`)
      .setTimestamp(Date())
      .setFooter('Channel error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    } 

    if (
      typeof message.guild.musicData.songDispatcher == "undefined" ||
      message.guild.musicData.songDispatcher == null
    ) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There is no song playing right now!`)
        .setTimestamp(Date())
        .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    } else if (message.guild.triviaData.isTriviaRunning) {
      let embed = new MessageEmbed()
        .setTitle(`Unable to skip`)
        .setColor(`#f26666`)
        .setDescription(`You can't skip a trivia! Use end-trivia`)
        .setTimestamp(Date())
        .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.reply(`You can't skip a trivia! Use end-trivia`);
    }
    message.guild.musicData.songDispatcher.end();
  }
};
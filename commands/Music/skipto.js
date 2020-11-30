const {
  Command
} = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

module.exports = class SkipToCommand extends Command {
  constructor() {
    super("skipto", {
      aliases: ["skipto"],
      category: "Music",
      description: {
        content: "Skip to a specific song in the queue, provide the song number as an argument"
      },
      guildOnly: true,
      args: [{
        id: "songNumber",
        prompt: {
          start: (msg, text) =>
            `What is the number in queue of the song you want to skip to?, it needs to be greater than 1`
        },
        type: "integer"
      }]
    });
  }

  exec(message, {
    songNumber
  }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`Please enter a valid song number`)
        .setTimestamp(Date())
        .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }
    var voiceChannel = message.member.voice.channel;
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
    }

    if (message.guild.musicData.queue < 1) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There are no songs in the queue`)
        .setTimestamp(Date())
        .setFooter('Queue error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }


    message.guild.musicData.queue.splice(0, songNumber - 1);
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
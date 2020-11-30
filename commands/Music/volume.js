const {
  Command
} = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

module.exports = class VolumeCommand extends Command {
  constructor() {
    super("volume", {
      aliases: ["volume", "change-volume"],
      category: 'Music',
      guildOnly: true,
      description: {
        content: "Adjust song volume"
      },
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [{
        id: "wantedVolume",
        prompt: {
          start: (msg, text) =>
            `What volume would you like to set? from 1 to 200`
        },
        type: "integer",
        validate: function (wantedVolume) {
          return wantedVolume >= 1 && wantedVolume <= 200;
        }
      }]
    });
  }

  exec(message, {
    wantedVolume
  }) {
    const voiceChannel = message.member.voice.channel;
    let embed = new MessageEmbed()
      .setTitle(`No user found in voice channel`)
      .setColor(`#f26666`)
      .setDescription(`Join a voice channel and try again`)
      .setTimestamp(Date())
      .setFooter('Channel error', 'https://chappy202.com/bobby-project/images/avatar.png');
    if (!voiceChannel) return message.util.send(embed);

    if (
      typeof message.guild.musicData.songDispatcher == "undefined" ||
      message.guild.musicData.songDispatcher == null
    ) {
      embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There is currently no active song playing.`)
        .setTimestamp(Date())
        .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    message.guild.musicData.songDispatcher.setVolume(volume);
    embed = new MessageEmbed()
        .setTitle(`Volume`)
        .setColor(`#6bcbd8`)
        .setDescription(`Current volume is: ${wantedVolume}%`)
        .setTimestamp(Date())
        .setFooter('Volume Command', 'https://chappy202.com/bobby-project/images/avatar.png');
    return message.util.send(embed);
  }
};
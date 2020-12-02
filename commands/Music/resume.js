const {
  Command
} = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

class ResumeCommand extends Command {
  constructor() {
    super("resume", {
      aliases: ["resume", "resume-song", "continue"],
      category: "Music",
      description: {
        content: "Resume the current paused song"
      },
      guildOnly: true
    });
  }

  exec(message) {
    let voiceChannel = message.member.voice.channel;
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
      message.guild.musicData.songDispatcher === null
    ) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There is no song playing right now!`)
        .setTimestamp(Date())
        .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }
    let embed = new MessageEmbed()
      .setTitle(`Song Reume`)
      .setColor(`#6bcbd8`)
      .setDescription(`Resumed the song playback :play_pause:`)
      .setTimestamp(Date())
      .setFooter('Resume Command', 'https://chappy202.com/bobby-project/images/avatar.png');

    message.channel.send(embed);

    message.guild.musicData.songDispatcher.resume();
  }
}

module.exports = ResumeCommand;
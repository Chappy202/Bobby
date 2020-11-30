const {
  Command
} = require('discord-akairo');
const {
  MessageEmbed
} = require('discord.js');

class LeaveCommand extends Command {
  constructor() {
    super("leave", {
      aliases: ["leave", 'end', 'fuckoff'],
      category: 'Music',
      guildOnly: true,
      description: {
        content: 'Leaves voice channel if in one'
      }
    });
  }

  exec(message) {
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
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
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
    if (!message.guild.musicData.queue) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There are no songs in the queue`)
        .setTimestamp(Date())
        .setFooter('Queue error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }
    message.guild.musicData.songDispatcher.end();
    message.guild.musicData.queue.length = 0;
    return;
  }
};

module.exports = LeaveCommand;
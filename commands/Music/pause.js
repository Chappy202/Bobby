const {
  Command
} = require('discord-akairo');
const {
  MessageEmbed
} = require('discord.js');

class PauseCommand extends Command {
  constructor() {
    super("pause", {
      aliases: ['pause', 'pause-song', 'hold', 'stop'],
      category: 'Music',
      description: {
        content: 'Pause the current playing song'
      },
      guildOnly: true
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
    };

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
    let embed = new MessageEmbed()
      .setTitle(`Paused`)
      .setColor(`#6bcbd8`)
      .setDescription(`Song paused :pause_button:`)
      .setTimestamp(Date())
      .setFooter('Pause Command', 'https://chappy202.com/bobby-project/images/avatar.png');

    message.util.send(embed);

    message.guild.musicData.songDispatcher.pause();
  }
};

module.exports = PauseCommand;
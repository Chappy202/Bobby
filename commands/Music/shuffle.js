const { Command } = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

class ShuffleQueueCommand extends Command {
  constructor() {
    super("shuffle", {
      aliases: ["shuffle"],
      category: "Music",
      description: { content: "Shuffle the song queue" },
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

    if (message.guild.musicData.queue.length < 1) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There are no songs in the queue`)
        .setTimestamp(Date())
        .setFooter('Queue error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }

    shuffleQueue(message.guild.musicData.queue);

    const titleArray = [];
    message.guild.musicData.queue.map(obj => {
      titleArray.push(obj.title);
    });
    var queueEmbed = this.client.util
      .embed()
      .setColor("#6bcbd8")
      .setTitle("New Music Queue");
    for (let i = 0; i < titleArray.length; i++) {
      queueEmbed.addField(`${i + 1}:`, `${titleArray[i]}`);
    }
    return message.util.send(queueEmbed);
  }
}

function shuffleQueue(queue) {
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
}

module.exports = ShuffleQueueCommand;
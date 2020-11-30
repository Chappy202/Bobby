const { Command } = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

class QueueCommand extends Command {
  constructor() {
    super("queue", {
      aliases: ["queue", "song-list", "next-songs"],
      category: "Music",
      guildOnly: true,
      description: { content: "Display the song queue" }
    });
  }

  exec(message) {
    if (message.guild.triviaData.isTriviaRunning) {
      let embed = new MessageEmbed()
      .setTitle(`Trivia running!`)
      .setColor(`#f26666`)
      .setDescription(`Try again after the trivia has ended.`)
      .setTimestamp(Date())
      .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }
    if (message.guild.musicData.queue.length == 0) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There are no songs in the queue`)
        .setTimestamp(Date())
        .setFooter('Queue error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }
    const authorArray = [];
    const titleArray = [];
    /* eslint-disable */
    message.guild.musicData.queue.map(obj => {
      authorArray.push(obj.author.tag);
    });
    message.guild.musicData.queue.map(obj => {
      titleArray.push(obj.title);
    });
    /* eslint-enable */
    var queueEmbed = this.client.util
      .embed()
      .setColor("#6bcbd8")
      .setThumbnail(this.client.user.displayAvatarURL())
      .setTimestamp()
      .setAuthor(message.guild.name+" Music Queue", message.guild.iconURL());
    for (let i = 0; i < titleArray.length; i++) {
      queueEmbed.setDescription(
        `${message.guild.musicData.queue
          .map(
            song =>
              `**-** ` +
              song.title +
              ` `)
          .join(`\n`)}`
      );
    }
    return message.util.send(queueEmbed);
  }
}

module.exports = QueueCommand;
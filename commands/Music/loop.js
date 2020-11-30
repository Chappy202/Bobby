const {
  Command
} = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

class LoopCommand extends Command {
  constructor() {
    super("loop", {
      aliases: ["loop"],
      category: "Music",
      guildOnly: true,
      description: {
        content: "Loop the current playing song"
      },
      * args() {
        const numOfTimesToLoop = yield {
          id: "numOfTimesToLoop",
          default: 1,
          type: "integer",
          prompt: {
            start: (msg, text) =>
              `How many times do you want to loop the song?`
          }
        };
        return {
          numOfTimesToLoop
        };
      }
    });
  }

  exec(message, {
    numOfTimesToLoop
  }) {
    if (!message.guild.musicData.isPlaying) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There is no song playing right now!`)
        .setTimestamp(Date())
        .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      let embed = new MessageEmbed()
        .setTitle(`Trivia running`)
        .setColor(`#f26666`)
        .setDescription(`You cannot loop over a trivia!`)
        .setTimestamp(Date())
        .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }

    for (let i = 0; i < numOfTimesToLoop; i++) {
      message.guild.musicData.queue.unshift(message.guild.musicData.nowPlaying);
    }

    // prettier-ignore
    message.channel.send(
      `${message.guild.musicData.nowPlaying.title} looped ${numOfTimesToLoop} ${
        (numOfTimesToLoop == 1) ? 'time' : 'times'
      }`
    );
  }
}

module.exports = LoopCommand;
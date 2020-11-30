const {
  Command
} = require("discord-akairo");
const {
  MessageEmbed
} = require('discord.js');

module.exports = class StopMusicTriviaCommand extends Command {
  constructor() {
    super("stop-trivia", {
      aliases: [
        "stop-music-trivia",
        "skip-trivia",
        "end-trivia",
        "stop-trivia"
      ],
      category: "Music",
      description: {
        content: "End the music trivia"
      },
      guildOnly: true,
      clientPermissions: ["SPEAK", "CONNECT"]
    });
  }
  exec(message) {
    if (!message.guild.triviaData.isTriviaRunning) {
      let embed = new MessageEmbed()
        .setTitle(`No trivia found`)
        .setColor(`#f26666`)
        .setDescription(`There is no trivia currently running`)
        .setTimestamp(Date())
        .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
    return message.util.send(embed);
  }

    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      let embed = new MessageEmbed()
        .setTitle(`No user in trivia channel`)
        .setColor(`#f26666`)
        .setDescription(`Join the trivia's channel and try again`)
        .setTimestamp(Date())
        .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }

    if (!message.guild.triviaData.triviaScore.has(message.author.username)) {
      let embed = new MessageEmbed()
        .setTitle(`No participation`)
        .setColor(`#f26666`)
        .setDescription(`You need to participate in the trivia in order to end it`)
        .setTimestamp(Date())
        .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }

    message.guild.triviaData.triviaQueue.length = 0;
    message.guild.triviaData.wasTriviaEndCalled = true;
    message.guild.triviaData.triviaScore.clear();
    message.guild.musicData.songDispatcher.end();
    let embed = new MessageEmbed()
        .setTitle(`Trivia Ended`)
        .setColor(`#6bcbd8`)
        .setDescription(`The Trivia has ended`)
        .setTimestamp(Date())
        .setFooter('Music Trivia', 'https://chappy202.com/bobby-project/images/avatar.png');
    return message.util.send(embed);
  }
};
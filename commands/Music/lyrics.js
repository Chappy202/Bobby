const {
  Command
} = require("discord-akairo");
const {
  MessageEmbed
} = require("discord.js");
const fetch = require("node-superfetch");
const cheerio = require("cheerio");
const {
  geniusLyricsAPI
} = require('../../config.json');

class LyricsCommand extends Command {
  constructor() {
    super("lyrics", {
      aliases: ["lyrics"],
      description: {
        content: "Get lyrics of any song or the lyrics of the currently playing song"
      },
      category: "Music",
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [{
        id: "songName",
        default: "",
        type: "string",
        prompt: {
          start: (msg, text) =>
            `What song lyrics would you like to get?`
        }
      }]
    });
  }
  async exec(message, {
    songName
  }) {
    if (
      songName == "" &&
      message.guild.musicData.isPlaying &&
      !message.guild.triviaData.isTriviaRunning
    ) {
      songName = message.guild.musicData.nowPlaying.title;
    } else if (songName == "" && message.guild.triviaData.isTriviaRunning) {
      let embed = new MessageEmbed()
        .setTitle(`Trivia Active`)
        .setColor(`#f26666`)
        .setDescription(`Please try again after the trivia has ended`)
        .setTimestamp(Date())
        .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    } else if (songName == "" && !message.guild.musicData.isPlaying) {
      let embed = new MessageEmbed()
        .setTitle(`No song found`)
        .setColor(`#f26666`)
        .setDescription(`There is no song playing right now, please try again with a song name or play a song first`)
        .setTimestamp(Date())
        .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return message.util.send(embed);
    }
    let embed = new MessageEmbed()
      .setTitle(`Searching`)
      .setColor(`#6bcbd8`)
      .setDescription(`👀 Searching for lyrics 👀`)
      .setTimestamp(Date())
      .setFooter('Lyrics Command', 'https://chappy202.com/bobby-project/images/avatar.png');
    const sentMessage = await message.channel.send(embed);

    // get song id
    var url = `https://api.genius.com/search?q=${encodeURI(songName)}`;

    const headers = {
      Authorization: `Bearer ${geniusLyricsAPI}`
    };
    try {
      var body = await fetch(url, {
        headers
      });
      var result = await body.json();
      const songID = result.response.hits[0].result.id;

      // get lyrics
      url = `https://api.genius.com/songs/${songID}`;
      body = await fetch(url, {
        headers
      });
      result = await body.json();

      const song = result.response.song;

      let lyrics = await getLyrics(song.url);
      lyrics = lyrics.replace(/(\[.+\])/g, "");

      if (lyrics.length > 4095) {
        let embed = new MessageEmbed()
          .setTitle(`Too long`)
          .setColor(`#f26666`)
          .setDescription(`Lyrics are too long to be returned as embed`)
          .setTimestamp(Date())
          .setFooter('Embed error', 'https://chappy202.com/bobby-project/images/avatar.png');
        return message.util.send(embed);
      }

      if (lyrics.length < 2048) {
        const lyricsEmbed = this.client.util
          .embed()
          .setColor("#6bcbd8")
          .setDescription(lyrics.trim());
        return sentMessage.edit("", lyricsEmbed);
      } else {
        // lyrics.length > 2048
        const firstLyricsEmbed = this.client.util
          .embed()
          .setColor("#6bcbd8")
          .setDescription(lyrics.slice(0, 2048));
        const secondLyricsEmbed = this.client.util
          .embed()
          .setColor("#6bcbd8")
          .setDescription(lyrics.slice(2048, lyrics.length));
        sentMessage.edit("", firstLyricsEmbed);
        message.channel.send(secondLyricsEmbed);
        return;
      }
    } catch (e) {
      console.error(e);
      let embed = new MessageEmbed()
          .setTitle(`Failed`)
          .setColor(`#f26666`)
          .setDescription(`Something when wrong, please try again or be more specific`)
          .setTimestamp(Date())
          .setFooter('Lyrics error', 'https://chappy202.com/bobby-project/images/avatar.png');
      return sentMessage.edit(embed);
    }
    async function getLyrics(url) {
      const response = await fetch(url);
      const text = await response.text();
      const $ = cheerio.load(text);
      return $(".lyrics")
        .text()
        .trim();
    }
  }
}

module.exports = LyricsCommand;
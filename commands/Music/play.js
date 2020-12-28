const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');
const { options } = require('node-superfetch');

class PlayCommand extends Command {
    constructor() {
        super('play', {
            aliases: ['play', 'p'],
            category: 'Music',
            description: {
                content: 'Can be used to play music',
                usage: 'play <song>'
            },
            guildOnly: true,
            clientPermissions: ["SPEAK", "CONNECT"],
            * args() {
                const query = yield {
                    match: "content",
                    prompt: {
                        start: (msg, text) =>
                            `What song or playlist would you like to listen to?`
                    },
                    type: "string",
                    validate: function (query) {
                        return query.length > 0 && query.length < 200;
                    }
                };
                return {
                    query
                };
            }
        });
    }
    async exec(message, {
        query
    }) {
        const voiceChannel = message.member.voice.channel;
        let isPlaying = this.client.player.isPlaying(message.guild.id);

        // Uncomment this section if the event listener is not working
        // Check whether or not a user is in the voice channel before playing music
        if (!voiceChannel) {
            let embed = new MessageEmbed()
                .setTitle(`No user found in voice channel`)
                .setColor(`#f26666`)
                .setDescription(`Join a voice channel and try again`)
                .setTimestamp(Date())
                .setFooter('Channel error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }

        // Check whether or not the user gave a playlist instead on a single song [Temporary]
        let playlistRegExp =  /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
        if (query.match(playlistRegExp)) {
            let playlist = await this.client.player.playlist(message.guild.id, query, voiceChannel, 200, message.author.tag);
            let song = playlist.song;
            playlist = playlist.playlist;
            //console.log(playlist);
            let embed = new MessageEmbed()
                .setTitle(`Added Playlist to Qeue ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Songs: ${playlist.videoCount}\nAuthor: ${playlist.channel}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${(playlist.requestedBy) ? playlist.requestedBy : 'Unknown'}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            message.util.send(embed);
            if (!isPlaying) {
                let embed = new MessageEmbed()
                    .setTitle(`Playing ➤ ${song.name}`)
                    .setURL(`${song.url}`)
                    .setColor(`#6bcbd8`)
                    .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                    .setThumbnail(`${song.thumbnail}`)
                    .setTimestamp(Date())
                    .setFooter(`Requested by: ${(song.requestedBy) ? song.requestedBy : 'Unknown'}`, 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(embed);
            }
            return;
        }

        // If there is a song playing, add the new one to the queue, otherwise start playing. (For a single song)
        if (isPlaying) {
            let song = await this.client.player.addToQueue(message.guild.id, query, {}, message.author.tag);
            song = song.song;
            let embed = new MessageEmbed()
                .setTitle(`Added ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${(song.requestedBy) ? song.requestedBy : 'Unknown'}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        } else {
            try {
                let song = await this.client.player.play(voiceChannel, query, {}, message.author.tag);
                song = song.song;
                //console.log(song);
                let embed = new MessageEmbed()
                    .setTitle(`Playing ➤ ${song.name}`)
                    .setURL(`${song.url}`)
                    .setColor(`#6bcbd8`)
                    .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                    .setThumbnail(`${song.thumbnail}`)
                    .setTimestamp(Date())
                    .setFooter(`Requested by: ${(song.requestedBy) ? song.requestedBy : 'Unknown'}`, 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(embed);
            } catch (err) {
                console.log(err);
                let embed = new MessageEmbed()
                    .setTitle(`Something went wrong.`)
                    .setColor(`#f26666`)
                    .setDescription(`I was unable to play ${song.name}, check the console.`)
                    .setTimestamp(Date())
                    .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(embed);
            }
        }
    }
}

module.exports = PlayCommand;
const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class AddQueueCommand extends Command {
    constructor() {
        super('add', {
            aliases: ['add', 'addsong'],
            category: 'Music',
            description: {
                content: 'Adds a song to the queue',
                usage: 'add <song>'
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
        let isPlaying = this.client.player.isPlaying(message.guild.id);

        // Check whether or not the user gave a playlist instead on a single song [Temporary]
        if (query.match(/^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/)) {
            let embed = new MessageEmbed()
                .setTitle(`Playlists un-supported`)
                .setColor(`#f26666`)
                .setDescription(`Youtube playlists are currently not supported. This will be fixed in a future update.`)
                .setTimestamp(Date())
                .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }

        // Check whether or not music is currently playing. If its player add to queue, otherwise start playing.
        if (isPlaying) {
            let song = await this.client.player.addToQueue(message.guild.id, query);
            song = song.song;
            let embed = new MessageEmbed()
                .setTitle(`Added ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author.name}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${song.requestedBy.name}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        } else {
            let song = await this.client.player.play(message.member.voice.channel, query);
            song = song.song;
            let embed = new MessageEmbed()
                .setTitle(`Playing ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author.name}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${song.requestedBy.name}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }
    }
}

module.exports = AddQueueCommand;
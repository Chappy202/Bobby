const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class RepeatCommand extends Command {
    constructor() {
        super('repeat', {
            aliases: ['repeat', 'loop'],
            category: 'Music',
            description: {
                content: 'Repeats the current playing song',
                usage: 'repeat'
            },
            guildOnly: true,
            clientPermissions: ["SPEAK", "CONNECT"],
        });
    }
    async exec(message) {
        let toggle = this.client.player.toggleLoop(message.guild.id);
        let song = this.client.player.nowPlaying(message.guild.id);
        if (toggle) {
            let embed = new MessageEmbed()
                .setTitle(`Repeating ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${song.requestedBy}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setTitle(`Stopped Repeating ➤ ${song.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${song.requestedBy}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }
    }
}

module.exports = RepeatCommand;
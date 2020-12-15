const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class NowPlayingCommand extends Command {
    constructor() {
        super('nowplaying', {
            aliases: ['nowplaying', 'np', 'playing'],
            category: 'Music',
            description: {
                content: 'View the current playing song',
                usage: 'np'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        let isPlaying = this.client.player.isPlaying(message.guild.id);
        if (isPlaying) {
            let song = await this.client.player.nowPlaying(message.guild.id);
            let progressBar = this.client.player.createProgressBar(message.guild.id, 20, '➤', '▬');
            let embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Current Song`, message.guild.iconURL())
                .setColor(`#6bcbd8`)
                .setDescription(`Current song: ${song.name}\n${progressBar}`)
                .setTimestamp(Date())
            return message.util.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Current song`, message.guild.iconURL())
                .setColor(`#f26666`)
                .setDescription(`There is currently no song playing.`)
                .setTimestamp(Date())
            return message.util.send(embed);
        }
    }
}

module.exports = NowPlayingCommand;
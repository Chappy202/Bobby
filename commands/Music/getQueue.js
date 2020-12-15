const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class GetQueueCommand extends Command {
    constructor() {
        super('queue', {
            aliases: ['queue', 'getqueue'],
            category: 'Music',
            description: {
                content: 'Displays the current queue',
                usage: 'queue'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        let queue = await this.client.player.getQueue(message.guild.id);
        if (queue) {
            let embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Music Queue`, message.guild.iconURL())
                .setColor(`#6bcbd8`)
                .setDescription(`${queue.songs.map((song, i) => {
                    return `${i === 0 ? 'Now Playing' : `#${i+1}`} - ${song.name}`
                }).join('\n')}`)
                .setTimestamp(Date())
            return message.util.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Music Queue`, message.guild.iconURL())
                .setColor(`#f26666`)
                .setDescription(`There are no songs in the queue`)
                .setTimestamp(Date())
            return message.util.send(embed);
        }
    }
}

module.exports = GetQueueCommand;
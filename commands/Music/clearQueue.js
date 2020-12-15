const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class ClearQueueCommand extends Command {
    constructor() {
        super('clearqueue', {
            aliases: ['clearqueue', 'clear'],
            category: 'Music',
            description: {
                content: 'Clears the song queue',
                usage: 'clear'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        this.client.player.clearQueue(message.guild.id);
        let queue = await this.client.player.getQueue(message.guild.id);
        if (!queue) {
            let embed = new MessageEmbed()
                .setTitle(`Cleared the queue`)
                .setColor(`#6bcbd8`)
                .setDescription(`There are no songs left in the queue.`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${message.author}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setTitle(`Queue already empty!`)
                .setColor(`#f26666`)
                .setDescription(`The queue is already empty!`)
                .setTimestamp(Date())
                .setFooter('Queue error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }
    }
}

module.exports = ClearQueueCommand;
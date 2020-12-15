const {
    Listener
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class EmptyQueueListener extends Listener {
    constructor() {
        super('end', {
            emitter: 'client',
            event: 'end'
        });
    }

    exec(message) {
        let embed = new MessageEmbed()
                .setTitle(`Empty queue`)
                .setColor(`#f26666`)
                .setDescription(`The queue is empty. Add more songs to resume playback.`)
                .setTimestamp(Date())
                .setFooter('Queue error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
    }
}

module.exports = EmptyQueueListener;
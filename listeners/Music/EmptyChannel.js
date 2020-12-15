const {
    Listener
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class EmptyChannelListener extends Listener {
    constructor() {
        super('channelEmpty', {
            emitter: 'client',
            event: 'channelEmpty'
        });
    }

    exec(message) {
        let embed = new MessageEmbed()
                .setTitle(`No user found in voice channel`)
                .setColor(`#f26666`)
                .setDescription(`Join a voice channel and try again`)
                .setTimestamp(Date())
                .setFooter('Channel error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
    }
}

module.exports = EmptyChannelListener;
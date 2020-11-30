const {
    Listener
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');
const { duration } = require('../utils/Functions');

class CooldownListener extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(message, command, remaining) {
        let output = new MessageEmbed()
            .setColor('#f26666')
            .setTitle(`Command on cooldown!`)
            .setDescription(`You have to wait \`${duration(remaining)}\` before you can use \`${command}\` again!`)
            .setTimestamp(Date())
            .setFooter('Naughty naughty!', 'https://chappy202.com/bobby-project/images/avatar.png');

        return message.util.send(output);
    }
}

module.exports = CooldownListener;
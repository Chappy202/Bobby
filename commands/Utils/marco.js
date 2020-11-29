const { Command } = require('discord-akairo');

class Marco extends Command {
    constructor() {
        super('marco', {
            aliases: ['marco', 'respond'],
            cooldown: 3000,
        });
    }

    async exec(message) {
        message.reply("Polo!");
    }
}

module.exports = Marco;
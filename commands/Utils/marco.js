const { Command } = require('discord-akairo');

class Marco extends Command {
    constructor() {
        super('marco', {
            aliases: ['marco', 'respond'],
            cooldown: 3000,
            category: 'Utility',
            description: {
                content: 'Simple Marco polo command',
                usage: 'marco'
            }
        });
    }

    async exec(message) {
        message.reply("Polo!");
    }
}

module.exports = Marco;
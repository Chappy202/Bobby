const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

    class ServerInfoCommand extends Command {
        constructor() {
            super('serverinfo', {
                aliases: ['serverinfo', 'server', 'guild'],
                category: 'Utility',
                description: {
                    usage: 'serverinfo',
                    examples: ['serverinfo'],
                    description: 'Display\'s guild info'
                },
                cooldown: 2000,
                ratelimit: 3
            })
        }

        exec(message) {
            // Add code
        }
    }

module.exports = ServerInfoCommand;
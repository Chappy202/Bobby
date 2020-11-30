const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

    class UserinfoCommand extends Command {
        constructor() {
            super('userinfo', {
                aliases: ['userinfo', 'user', 'whois'],
                category: 'Utility',
                args: [{ 
                    id: 'member', type: 'member', default: _ => _.member
                }],
                description: {
                    usage: 'userinfo < @Mention | id | username >',
                    examples: ['userinfo @host', 'userinfo 123456789012345678', 'userinfo host'],
                    description: 'Display\'s user information'
                },
                category: 'Miscellaneous',
                cooldown: 3000,
                ratelimit: 3
            });
        }

        async exec(message, { member }) {
            // Code
        }
    }

module.exports = UserinfoCommand;
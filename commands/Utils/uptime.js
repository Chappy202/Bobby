const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { duration } = require('../../utils/Functions');

    class UptimeCommand extends Command {
        constructor() {
            super('uptime', {
                aliases: ['uptime'],
                category: 'Utility',
                description: {
                    usage: 'uptime',
                    examples: ['uptime'],
                    description: 'Display\'s the bots uptime'
                },
                cooldown: 2000,
                ratelimit: 3
            })
        }

        exec(message) {
            return message.util.send(
                new MessageEmbed()
                    .setColor('#6bcbd8')
                    .setTitle(`I've been awake for:`)
                    .setDescription(`\`${duration(this.client.uptime)}\``)
            );
        }
    }

module.exports = UptimeCommand;
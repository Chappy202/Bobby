const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class RepeatCommand extends Command {
    constructor() {
        super('repeat', {
            aliases: ['repeat'],
            category: 'Music',
            description: {
                content: 'Reoeats a song',
                usage: 'repeat <song>'
            },
            guildOnly: true,
            clientPermissions: ["SPEAK", "CONNECT"],
            * args() {
                const query = yield {
                    match: "content",
                    prompt: {
                        start: (msg, text) =>
                            `What song or playlist would you like to repeat?`
                    },
                    type: "string",
                    validate: function (query) {
                        return query.length > 0 && query.length < 200;
                    }
                };
                return {
                    query
                };
            }
        });
    }
    async exec(message, {
        query
    }) {
        // this.client.player.setRepeatMode(message.guild.id, true);

    }
}

module.exports = RepeatCommand;
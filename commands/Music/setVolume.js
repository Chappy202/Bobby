const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class SetVolumeCommand extends Command {
    constructor() {
        super('volume', {
            aliases: ['volume'],
            category: 'Music',
            description: {
                content: 'Sets the volume of the current playing song',
                usage: 'volume <%>'
            },
            guildOnly: true,
            clientPermissions: ["SPEAK", "CONNECT"],
            args: [
				{
					id: 'volume',
					type: 'string'
				}
			],
        });
    }
    async exec(message, args) {
        this.client.player.setVolume(message.guild.id, parseInt(args.volume));
        let embed = new MessageEmbed()
                .setTitle(`Volume set to ${args.volume}%`)
                .setColor(`#6bcbd8`)
                .setDescription(`Volume adjusted :speaker:`)
                .setTimestamp(Date())
                .setFooter(`Volume`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
    }
}

module.exports = SetVolumeCommand;
const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class StopCommand extends Command {
    constructor() {
        super('stop', {
            aliases: ['stop', 's'],
            category: 'Music',
            description: {
                content: 'Can be used to Stop music',
                usage: 'stop'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        this.client.player.stop(message.guild.id);
        let embed = new MessageEmbed()
            .setTitle(`Stopped`)
            .setColor(`#6bcbd8`)
            .setDescription(`Music Stopped :stop_button:, queue cleared :wastebasket:`)
            .setTimestamp(Date())
            .setFooter(`Stopped Playback`, 'https://chappy202.com/bobby-project/images/avatar.png');
        return message.util.send(embed);
    }
}

module.exports = StopCommand;
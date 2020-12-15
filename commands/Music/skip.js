const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class SkipCommand extends Command {
    constructor() {
        super('skip', {
            aliases: ['skip', 'sk'],
            category: 'Music',
            description: {
                content: 'Skips the current playing song',
                usage: 'skip'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        let song = await this.client.player.skip(message.guild.id);
        song = song.song;
        let embed = new MessageEmbed()
            .setTitle(`Skipped: ${song.name}`)
            .setColor(`#6bcbd8`)
            .setDescription(`Skipped :track_next:`)
            .setTimestamp(Date())
            .setFooter(`Next Queue index`, 'https://chappy202.com/bobby-project/images/avatar.png');
        return message.util.send(embed);
    }
}

module.exports = SkipCommand;
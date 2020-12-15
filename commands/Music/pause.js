const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class PauseCommand extends Command {
    constructor() {
        super('pause', {
            aliases: ['pause'],
            category: 'Music',
            description: {
                content: 'Pause the current playing song',
                usage: 'pause'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        let song = await this.client.player.pause(message.guild.id);
        song = song.song;
        let embed = new MessageEmbed()
            .setTitle(`Paused: ${song.name}`)
            .setColor(`#6bcbd8`)
            .setDescription(`Song paused :pause_button:`)
            .setTimestamp(Date())
            .setFooter(`Playback halted`, 'https://chappy202.com/bobby-project/images/avatar.png');
        return message.util.send(embed);
    }
}

module.exports = PauseCommand;
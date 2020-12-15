const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class ResumeCommand extends Command {
    constructor() {
        super('resume', {
            aliases: ['resume'],
            category: 'Music',
            description: {
                content: 'Resumes the current paused song.',
                usage: 'resume'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        let song = await this.client.player.resume(message.guild.id);
        song = song.song;
        if (song) {
            let embed = new MessageEmbed()
                .setTitle(`Resumed: ${song.name}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Song resumed :arrow_forward:`)
                .setTimestamp(Date())
                .setFooter(`Playback resumed`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Current song`, message.guild.iconURL())
                .setColor(`#f26666`)
                .setDescription(`There is currently no song playing.`)
                .setTimestamp(Date())
            return message.util.send(embed);
        }
    }

}

module.exports = ResumeCommand;
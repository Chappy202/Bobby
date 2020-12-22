const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed, GuildChannel
} = require('discord.js');

class LeaveCommand extends Command {
    constructor() {
        super('leave', {
            aliases: ['leave', 'fuckoff', 'foff', 'ff'],
            category: 'Music',
            description: {
                content: 'Tells bobby to leave the channel',
                usage: 'leave'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        this.client.player.stop(message.guild.id);
        //GuildChannel.leave();
        let embed = new MessageEmbed()
                    .setTitle(`Looks like I'm no longer wanted...`)
                    .setColor(`#6bcbd8`)
                    .setDescription(`Stopped the music and cleared the queue. Bye!`)
                    .setTimestamp(Date())
                    .setFooter(`VoiceChannel Left`, 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(embed);
    }
}

module.exports = LeaveCommand;
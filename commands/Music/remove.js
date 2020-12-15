const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class RemoveSongCommand extends Command {
    constructor() {
        super('remove', {
            aliases: ['remove', 'delete'],
            category: 'Music',
            description: {
                content: 'Removes a song from the queue',
                usage: 'remove <song>'
            },
            guildOnly: true,
            clientPermissions: ["SPEAK", "CONNECT"],
            args: [{
                id: 'songid',
                type: 'string'
            }],
        });
    }
    async exec(message, args) {
        let SongID = parseInt(args.songid) - 1;
        this.client.player.remove(message.guild.id, SongID).then(() => {
            let embed = new MessageEmbed()
                .setTitle(`Removed ${query}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Removed song from queue :wastebasket:`)
                .setTimestamp(Date())
                .setFooter(`Playback halted`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }).catch((err) => {
            console.log(err);
        });
    }
}

module.exports = RemoveSongCommand;
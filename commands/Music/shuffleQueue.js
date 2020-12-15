const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class ShuffleCommand extends Command {
    constructor() {
        super('shuffle', {
            aliases: ['shuffle'],
            category: 'Music',
            description: {
                content: 'Shuffles the queue',
                usage: 'shuffle'
            },
            guildOnly: true,
        });
    }
    async exec(message) {
        this.client.player.shuffle(message.guid.id);
        let embed = new MessageEmbed()
                .setTitle(`Queue`)
                .setColor(`#6bcbd8`)
                .setDescription(`Shuffled queue :twisted_rightwards_arrows:`)
                .setTimestamp(Date())
                .setFooter(`Queue index randomized`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
    }
}

module.exports = ShuffleCommand;
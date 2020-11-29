const { Command } = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class Marco extends Command {
    constructor() {
        super('github', {
            aliases: ['github', 'ghub', 'gh'],
            cooldown: 1000,
            category: 'Information',
            description: {
                content: 'Displays the Bobby GitHub Repository link',
                usage: 'github'
            }
        });
    }

    async exec(message) {
        let output = new MessageEmbed()
                .setColor('#9CDAF1')
                .setTitle(`GitHub Repository`)
                .setURL('https://github.com/Chappy202/Bobby')
                .setThumbnail('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
                .setDescription(`**You can find my GitHub repo here:** https://github.com/Chappy202/Bobby`)
                .setTimestamp(Date())
                .setFooter('GitHub Repository', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
    }
}

module.exports = Marco;
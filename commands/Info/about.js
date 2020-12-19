const { Command } = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class About extends Command {
    constructor() {
        super('about', {
            aliases: ['about'],
            cooldown: 1000,
            category: 'Information',
            description: {
                content: 'Shows information about Bobby',
                usage: 'about'
            }
        });
    }

    async exec(message) {
        let output = new MessageEmbed()
                .setColor('#9CDAF1')
                .setTitle(`About Bobby`)
                .setURL('https://github.com/Chappy202/Bobby')
                .setThumbnail('https://chappy202.com/bobby-project/images/avatar.png')
                .setDescription([`Bobby is developed by **@Chappy🎄#3353**`
            ,''
            ,`Bobby uses the **[Discord.js](https://discord.js.org)** library and the **[Akairo](https://discord-akairo.github.io/#/)** framework.`
            ,`You can find the Github repo for Bobby **[here](https://github.com/Chappy202/Bobby)**.`
            ,``
            ,`Use \`-help prefix\` for a list of prefixes, or \`-help\` for more info.`])
                .setTimestamp(Date())
                .setFooter('Your friendly Discord helper.', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
    }
}

module.exports = About;
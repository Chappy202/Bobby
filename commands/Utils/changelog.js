const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

const fs = require('fs');

class ChangelogCommand extends Command {
    constructor() {
        super('changelog', {
            aliases: ['changelog', 'updates'],
            cooldown: 5000,
            category: 'Utility',
            description: {
                content: 'View the latest changes to the bot',
                usage: 'changelog'
            }
        });
    }
    exec(message) {
        'use strict';

        // fs.readFile('./changelog/log.json', (err, data) => {
        //     if (err) {
        //         console.log("Error! = " + err.message);
        //     } else {
        //         let changelog = JSON.parse(data);
        //         console.log(changelog);
        //     }
        // })

        let rawdata = fs.readFileSync('./changelog/log.json'); // ../../utils/Functions
        let changelog = JSON.parse(rawdata);
        let changes = changelog[changelog.length - 1].changes;
        let date = changelog[changelog.length - 1].date;
        if (changes.length < 10) {
            let olderChanges = changelog[changelog.length - 2].changes;
            let olderDate = changelog[changelog.length - 2].date;
            let output = new MessageEmbed()
                .setColor('#6bcbd8')
                .setTitle(`Recent Changes to Bobby`)
            let description = `**Changelog: ${date}**\n`;

            changes.forEach(change => {
                description = description + `- \`${change}\`\n`;
            });
            description = description + `\n**Changelog: ${olderDate}**\n`;
            olderChanges.forEach(change => {
                description = description + `- \`${change}\`\n`;
            });
            output.setDescription(description);
            return message.util.send(output);
        } else {
            let output = new MessageEmbed()
                .setColor('#6bcbd8')
                .setTitle(`Recent Changes to Bobby`)
            let description = `**Changelog: ${date}**\n`;

            changes.forEach(change => {
                description = description + `- \`${change}\`\n`;
            });
            output.setDescription(description);
            return message.util.send(output);
        }

    }
}

module.exports = ChangelogCommand;
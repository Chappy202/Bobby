const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload', 'refresh'],
            category: 'Management',
            args: [{
                id: 'ArgOne',
                type: 'string',
                //default: 'bitcoin'
            }],
            cooldown: 5000,
        });
    }
    exec(message, args) {
        if (args.ArgOne === null) {
            let output = new MessageEmbed()
                .setColor('#f26666')
                .setTitle(`No argument provided`)
                .setDescription(`**Possible arguments:** all, [command name]`)
                .setTimestamp(Date())
                .setFooter('Argument error', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
        } else if (args.ArgOne === 'all') {
            this.handler.reloadAll();

            let output = new MessageEmbed()
                .setColor('#66f266')
                .setTitle(`Reloaded all Modules`)
                .setDescription(`**Reloaded Commands:** ${this.handler.modules.size}`)
                .setTimestamp(Date())
                .setFooter('Reloaded modules', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
        } else {
            let exist = false;
            for (let [key, value] of this.handler.modules) {
                if (value.categoryID === args.ArgOne) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                this.handler.reload(args.ArgOne);
                let output = new MessageEmbed()
                .setColor('#66f266')
                .setTitle(`Reloaded ${args.ArgOne}`)
                .setDescription(`**Successfully reloaded the command:** ${args.ArgOne}`)
                .setTimestamp(Date())
                .setFooter('Reloaded modules', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
            } else {
                let output = new MessageEmbed()
                .setColor('#f26666')
                .setTitle(`Failed to find module`)
                .setDescription(`Could not find the command ${args.ArgOne}, make sure that you entered the name correctly.`)
                .setTimestamp(Date())
                .setFooter('Argument error', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
            }
        }
    }
}

module.exports = ReloadCommand;
const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'guide', 'list'],
            category: 'Utility',
            args: [{
                id: 'ArgOne',
                type: 'string',
                //default: 'bitcoin'
            }],
            description: {
                content: 'Displays a list of all available commands, or detailed info of a specific command',
                usage: 'help [command|prefix]'
            }
        });
    }
    async exec(message, args) {
        if (args.ArgOne === null) {
            // Show help menu
            try {
                let output = new MessageEmbed()
                    .setColor('#6bcbd8')
                    .setTitle(`List of all commands`)
                    .addField(`Commands`, `A list of available commands.
                For additional info on a command, use \`-help <command>\`
                `);
                //console.log(this.handler.categories.values());
                for (const category of this.handler.categories.values()){
                    output.addField(`${category.id}`, `${category.filter((cmd) => cmd.aliases.length > 0).map((cmd) => `\`-${cmd.aliases[0]}\``).join(' ')}`);
                }

                return message.util.send(output);
                
            } catch (error) {
                console.log(`Something went wrong: ${error}`);
            }
        } else if (args.ArgOne === 'prefix') {
            let output = new MessageEmbed()
                    .setColor('#6bcbd8')
                    .setTitle(`List of all prefixes`)
                    .addField(`Mention`, `You can @ me to use commands`);
            let prefixes = this.handler.prefix.join(', ');
            output.addField(`Prefixes`, `${prefixes}`);
            return message.util.send(output);
        } else {
            // Show command specific help
            try {
                let output = new MessageEmbed()
                    .setColor('#6bcbd8')
                    .setTitle(`Help for "${args.ArgOne}"`)
                    .setDescription(`**Usage:** ${this.handler.prefix[2]}${this.handler.modules.get(args.ArgOne).description.usage} 
                **Description:** ${this.handler.modules.get(args.ArgOne).description.content}
                **Cooldown:** ${this.handler.modules.get(args.ArgOne).cooldown}
                **RateLimit:** ${this.handler.modules.get(args.ArgOne).ratelimit}
                **Aliases:** ${this.handler.modules.get(args.ArgOne).aliases}
                **Category** ${this.handler.modules.get(args.ArgOne).categoryID}`)
                    .setTimestamp(Date())
                    .setFooter(`${this.handler.prefix[2]}${args.ArgOne}`, 'https://chappy202.com/bobby-project/images/avatar.png');

                return message.util.send(output);
            } catch (e) {
                let output = new MessageEmbed()
                    .setColor('#f26666')
                    .setTitle(`Failed to find module`)
                    .setDescription(`Could not find the command "**${args.ArgOne}**", make sure that you entered the name correctly.`)
                    .setTimestamp(Date())
                    .setFooter('Argument error', 'https://chappy202.com/bobby-project/images/avatar.png');

                return message.util.send(output);
            }
        }
        // for (let command of this.handler.modules.keys()){
        //     console.log(command);
        // }
    }
}

module.exports = HelpCommand;
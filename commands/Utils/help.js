const {
    Command, CommandHandler
} = require('discord-akairo');
const { Collection } = require('discord.js');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'guide'],
            category: 'Utility'
        });
    }
    exec(message) {
        const modules = this.handler.modules;
        const categories = [];
        const commands = [];
        const items = new Collection();
        for (let [key, value] of modules) {
            if (!categories.includes(value.categoryID)) {
                categories.push(value.categoryID);
            }
            let command = {
                name: value.category,
                aliases: value.aliases,
                cooldown: value.cooldown,
                category: value.categoryID
            }
            commands.push(command);
        }
        
        commands.forEach(command => {
            const category = items.get(command.category);
            if (category) {
                category.set(command.name, command);
            } else {
                items.set(command.category, new Collection().set(command.name, command));
            }
        });
        let itemsJson = items.toJSON();
        let output = [];
        itemsJson.forEach(item => {
            output += `**${item.category}:**\n`;
            let comname = item.name;
            comname.forEach(name => {
                output += `**-${name}**`;
            });
            //console.log(item);
        });
        message.util.send(output);
        
        // message.util.send(commands);
    }
}

module.exports = HelpCommand;
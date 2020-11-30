const { Command } = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');
const pluralize = require('pluralize');

class PruneCommand extends Command {
    constructor() {
        super('prune', {
            aliases: ['prune', 'purge'],
            cooldown: 5000,
            category: 'Moderation',
            description: {
                content: 'Prunes up to 100 messages in the channel it was sent in.',
                usage: 'prune [number]',
                examples: ['prune 50']
            },
            args: [{
                id: 'count',
                type: 'number'
            }],
            channelRestriction: 'guild',
            clientPermissions: ['MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY'],
            userPermissions: ['MANAGE_MESSAGES']
        });
    }

    async exec(message, args) {
        const channel = message.channel;
		const count = args.count;
		const messageCount = pluralize('message', count, true);
		if (channel.type === 'dm') {
			let output = new MessageEmbed()
                .setColor('#f26666')
                .setDescription(`This command cannot be used in direct messages.`)
                .setTimestamp(Date())
                .setFooter('Message error', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.channel.send(output);
		}
		if (count > 100 || !count) {
			let output = new MessageEmbed()
                .setColor('#f26666')
                .setTitle(`Number invalid`)
                .setDescription(`You either didn't enter a number, or you entered a number larger than 50.`)
                .setTimestamp(Date())
                .setFooter('Argument error', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.channel.send(output);
		}
		try {
            await message.channel.bulkDelete(count + 1, true);
            let deleting = new MessageEmbed()
                .setColor('#6bcbd8')
                .setDescription(`Deleting ${messageCount}, please wait...`)
                .setTimestamp(Date())
            let deleted = new MessageEmbed()
                .setColor('#66f266')
                .setDescription(`Deleted ${messageCount}.`)
                .setTimestamp(Date())

			await message.channel.send(deleting).then((msg) => {
				msg.edit(deleted).then(res => res.delete(10000));
			});
		} catch (err) {
			let output = new MessageEmbed()
                .setColor('#f26666')
                .setTitle(`Failed to delete messages`)
                .setDescription(`I was unable to delete the messages`)
                .setTimestamp(Date())
            console.log(err);
            return message.util.send(output);
		}
    }
}

module.exports = PruneCommand;
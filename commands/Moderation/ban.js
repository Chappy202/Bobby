const { Command } = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            cooldown: 5000,
            category: 'Moderation',
            description: {
                content: 'Bans a specified member from the Discord',
                usage: 'ban [member] [reason]'
            },
            args: [{
                id: 'member',
                type: 'member'
            },{
                id: 'reason',
                match: 'rest',
				type: 'string'
            }],
            channelRestriction: 'guild',
            clientPermissions: ['ADMINISTRATOR'],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async exec(message, args) {
        const member = args.member;
        const reason = args.reason;
        if (message.channel.type === 'dm') {
            let output = new MessageEmbed()
                .setColor('#f26666')
                .setDescription(`This command cannot be used in direct messages.`)
                .setTimestamp(Date())
                .setFooter('Message error', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.channel.send(output);
        }

        if (!member) {
            let output = new MessageEmbed()
                .setColor('#f26666')
                .setTitle(`Failed to find member`)
                .setDescription(`You did not mention the member you would like to ban!`)
                .setTimestamp(Date())
                .setFooter('Argument error', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.channel.send(output);
        }

        if (!reason) {
            let output = new MessageEmbed()
                .setColor('#f26666')
                .setTitle(`Failed to assign reason`)
                .setDescription(`You did not give a reason as to why you want to ban this member!`)
                .setTimestamp(Date())
                .setFooter('Argument error', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.channel.send(output);
        }

        await member.kick(reason).then(() => {
            let output = new MessageEmbed()
                .setColor('#66f266')
                .setTitle(`Member Banned!`)
                .setThumbnail(member.avatarURL)
                .setDescription(`**Guild:** ${member.guild.name}\n` +
                '' +
                `**Member:** ${member.user.tag}\n` +
                '' +
                `**Reason:** ${reason}`)
                .setTimestamp(Date())
                .setFooter('Member banned', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
        }).catch((err) => {
            let output = new MessageEmbed()
                .setColor('#f26666')
                .setTitle(`Failed to kick member`)
                .setDescription(`I was unable to ban member **${member.user.tag}**.`)
                .setTimestamp(Date())
                .setFooter('Permission error', 'https://chappy202.com/bobby-project/images/avatar.png');
            console.log(err);
            return message.channel.send(output);
        });
    }
}

module.exports = BanCommand;
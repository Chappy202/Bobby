const { Command } = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class AvatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'avy'],
            cooldown: 1000,
            category: 'Utility',
            description: {
                content: 'Show the avatar of the mentioned user, or your own avatar',
                usage: 'avatar [@user]',
                examples: ['avatar @user', 'avatar']
            },
            args: [{
                id: 'user',
                type: 'user'
            }]
        });
    }

    async exec(message, args) {
        const avatarEmbed = this.client.util.embed()
            .setColor(`#6bcbd8`)
            .setTitle(`Avatar`);
        
        if (!args.user) {
            let format = message.author.displayAvatarURL({ dynamic: true }).substr(message.author.displayAvatarURL({ dynamic: true }).length - 3);
            if (format == 'gif') {
                avatarEmbed.setAuthor(message.author.username);
                avatarEmbed.setDescription(`[gif](${message.author.displayAvatarURL({ format: 'gif', size: 2048 })})`);
                avatarEmbed.setImage(message.author.displayAvatarURL({ format: 'gif', size: 2048 }));
            } else {
                avatarEmbed.setAuthor(message.author.username);
				avatarEmbed.setDescription(`[png](${message.author.displayAvatarURL({ format: 'png', size: 2048 })}) | [jpeg](${message.author.displayAvatarURL({ format: 'jpg', size: 2048 })}) | [webp](${message.author.displayAvatarURL({ format: 'webp', size: 2048 })})`);
				avatarEmbed.setImage(message.author.displayAvatarURL({ format: 'png', size: 2048 }));
            }
            return message.util.send({embed: avatarEmbed});
        } else {
            let format = args.user.displayAvatarURL({ dynamic: true }).substr(args.user.displayAvatarURL({ dynamic: true }).length - 3);
			//console.log(format);
			if (format == 'gif') {
				avatarEmbed.setAuthor(args.user.username);
				avatarEmbed.setDescription(`[gif](${args.user.displayAvatarURL({ format: 'gif', size: 2048 })})`);
				avatarEmbed.setImage(args.user.displayAvatarURL({ format: 'gif', size: 2048 }));
			} else {
				avatarEmbed.setAuthor(args.user.username);
				avatarEmbed.setDescription(`[png](${args.user.displayAvatarURL({ format: 'png', size: 2048 })}) | [jpeg](${args.user.displayAvatarURL({ format: 'jpg', size: 2048 })}) | [webp](${args.user.displayAvatarURL({ format: 'webp', size: 2048 })})`);
				avatarEmbed.setImage(args.user.displayAvatarURL({ format: 'png', size: 2048 }));
			}
			return message.channel.send({embed: avatarEmbed});
        }
    }
}

module.exports = AvatarCommand;
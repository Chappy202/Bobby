const {
    Listener
} = require('discord-akairo');
const {
    joinChannel
} = require('../config.json');

class guildMemberAddListener extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    welcomes () {
		const response = [
			'Welcome to the swingers club ',
			'It is decidedly so.',
			'Without a doubt.',
			'Yes - definitely.',
			'You may rely on it.',
			'As I see it, yes.',
			'Most likely.',
			'Outlook good.',
			'Yes.',
			'Signs point to yes.',
			'Reply hazy, try again.',
			'Ask again later.',
			'Better not tell you now.',
			'Cannot predict now.',
			'Concentrate and ask again.',
			"Don't count on it.",
			'My reply is no.',
			'My sources say no.',
			'Outlook not so good.',
			'Very doubtful.'
		];

		var responseIndex = Math.floor(Math.random() * response.length) + 1;
		return response[responseIndex];
	}

    async exec(member) {
        const channel = this.client.channels.resolve(joinChannel);
        let embed = new MessageEmbed()
                    .setTitle(`Welcome to the OHGT`)
                    .setColor(`#6bcbd8`)
                    .setDescription(`Your average madhouse ${member.user}`)
                    .setTimestamp(Date())
                    .setFooter(`User Joined`, 'https://chappy202.com/bobby-project/images/avatar.png');
        return channel.send(embed);
    }
}

module.exports = guildMemberAddListener;
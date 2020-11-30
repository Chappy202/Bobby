const { Command } = require('discord-akairo');
const {
    MessageEmbed
} = require('discord.js');

class EightBallCommand extends Command {
	constructor () {
		super('8ball', {
			aliases: ['8ball'],
			description: {
				content: "Magic 8-ball answers to 'yes' or 'no' questions",
				usage: '8ball <question>',
				examples: ['8ball Will I win the lottery?']
			},
			args: [
				{
					id: 'question',
					type: 'string'
				}
			],
			category: 'Fun',
			ratelimit: 2
		});
	}

	answer () {
		const response = [
			'It is certain.',
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

	exec (message) {
        let output = new MessageEmbed()
                .setColor('#6bcbd8')
                .setDescription(`**🎱 ${this.answer()}**`)
                .setTimestamp(Date())

        return message.util.send(output);
	}
}

module.exports = EightBallCommand;
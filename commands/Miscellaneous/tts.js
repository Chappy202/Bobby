
const { Command } = require('discord-akairo');

class TTSCommand extends Command {
	constructor() {
		super('tts', {
			aliases: ['tts', 'speak'],
			channel: 'guild',
			args: [
				{
					id: 'thing',
					type: 'string',
					match: 'content'
				}
            ],
            category: 'Miscellaneous'
		});
	}

	async exec(message, { thing }) {
		message.channel.send(thing, {
			tts: true
		});
		message.delete();
	}
}

module.exports = TTSCommand;
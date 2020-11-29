const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'latency'],
            cooldown: 5000,
            category: 'Utility',
            description: {
                content: 'Used to view the API and server Latency',
                usage: 'ping'
            }
        });
    }
    exec(message) {
        const timeDiff = Date.now() - message.createdAt;

        let output = new MessageEmbed()
            .setColor('#f2a900')
            .setTitle(`🏓 Pong!`)
            .setDescription(`🔂 **RTT**: ${timeDiff} ms
                💟 **Heartbeat - API**: ${Math.round(this.client.ws.ping)} ms`)
            .setTimestamp(Date())
            .setFooter('-ping', 'https://chappy202.com/bobby-project/images/avatar.png');

        return message.util.send(output);
    }
}

module.exports = PingCommand;
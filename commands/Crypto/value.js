const {
    Command
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');
// CapatalizeFirst util
const upFirst = require('../../utils/capatalizeFirst');

// Require Coingecko api
const CoinGecko = require('coingecko-api');
// Initiate the CoinGecko api
const CoinGeckoClient = new CoinGecko();

class Value extends Command {
    constructor() {
        super('crypto', {
            aliases: ['crypto', 'token', 'value', 'btc'],
            args: [{
                id: 'cryptArgOne',
                type: 'string',
                //default: 'bitcoin'
            }],
            category: 'Crypto',
            description: {
                content: 'Shows the current Crypto prices and API status of CoinGecko',
                usage: 'crypto [currency|status]'
            },
            cooldown: 5000,
        });
    }
    async exec(message, args) {
        if (args.cryptArgOne === null) {
            let data = await CoinGeckoClient.simple.price({
                ids: ['bitcoin'],
                vs_currencies: ['usd', 'zar'],
            });
            let output = new MessageEmbed()
                .setColor('#f2a900')
                .setTitle(`No currency provided. Default: Bitcoin`)
                .setDescription(`**Bitcoin value in USD:** $${data.data.bitcoin.usd}
        **Bitcoin value in ZAR:** R${data.data.bitcoin.zar}`)
                .setTimestamp(Date())
                .setFooter('Values provided by CoinGeckoApi', 'https://chappy202.com/bobby-project/images/avatar.png');

            return message.util.send(output);
        } else if (args.cryptArgOne === 'status' || args.cryptArgOne === 'api' || args.cryptArgOne === 'ping') {
            let ping = await CoinGeckoClient.ping();
            if (ping.success === true) {
                let output = new MessageEmbed()
                    .setColor('#66f266')
                    .setTitle(`The CoinGecko API is available`)
                    .setDescription(`Gecko Says: ${ping.data.gecko_says}`)
                    .setTimestamp(Date())
                    .setFooter('Values provided by CoinGeckoApi', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(output);
            } else {
                return apiDown();
            }
        } else {
            let currency = args.cryptArgOne.toLowerCase();
            let data = await CoinGeckoClient.simple.price({
                ids: [currency],
                vs_currencies: ['usd', 'zar'],
            });
            if (data.success === true) {
                if (!(Object.keys(data.data).length === 0 && data.data.constructor === Object)) {
                    const output = new MessageEmbed()
                        .setColor('#6bcbd8')
                        .setTitle(`Value of ${upFirst(currency)}`)
                        .setDescription(`**${upFirst(currency)} value in USD:** $${data.data[currency].usd}
            **${upFirst(currency)} value in ZAR:** R${data.data[currency].zar}`)
                        .setTimestamp(Date())
                        .setFooter('Values provided by CoinGeckoApi', 'https://chappy202.com/bobby-project/images/avatar.png');

                    return message.util.send(output);
                } else {
                    const output = new MessageEmbed()
                        .setColor('#6bcbd8')
                        .setTitle(`Undefined Currency`)
                        .setDescription(`I couldn't find that currency! Make sure you spelled it right, and avoid using abbreviations such as 'BTC'`)
                        .setTimestamp(Date())
                        .setFooter('Values provided by CoinGeckoApi', 'https://chappy202.com/bobby-project/images/avatar.png');

                    return message.util.send(output);
                }
            } else {
                return apiDown();
            }
        }
    }
}

module.exports = Value;

function apiDown() {
    let output = new MessageEmbed()
        .setColor('#f26666')
        .setTitle(`The CoinGecko API is un-available`)
        .setDescription(`Looks like the API is down. Check back again later.`)
        .setTimestamp(Date())
        .setFooter('Values provided by CoinGeckoApi', 'https://chappy202.com/bobby-project/images/avatar.png');

    return message.util.send(output);
}
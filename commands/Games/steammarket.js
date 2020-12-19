const {
    Command
} = require('discord-akairo');
const SteamMarketFetcher = require('steam-market-fetcher');
const {
    MessageEmbed
} = require('discord.js');
const fetcher = new SteamMarketFetcher({
    currency: 'ZAR',
    format: 'json'
});

class SteamMarketCommand extends Command {
    constructor() {
        super('steammarket', {
            aliases: ['steammarket', 'sm'],
            cooldown: 3000,
            category: 'Games',
            description: {
                content: 'Retrieves and item from the steam market place.',
                usage: 'sm <game> <item name>',
                examples: [
                    'sm dota Fractal Horns of Inner Abysm',
                    'sm 570 Fractal Horns of Inner Abysm',
                    'sm 730 AK-47 | Redline (Field-Tested)'
                ]
            },
            args: [{
                id: 'game',
                type: 'string',
                prompt: {
                    start: 'What is the gameID or name? (Supported names are "Dota", "CSGO", "TF2")',
                    optional: true
                },
                default: '570',
                match: 'rest'
            }, {
                id: 'item',
                type: 'string',
                prompt: {
                    start: 'What is the item name?',
                    optional: true
                }
            }],
        });
    }

    async exec(message, args) {
        const games = [{
                name: 'Dota',
                id: '570'
            },
            {
                name: 'CSGO',
                id: 730
            },
            {
                name: 'TF2',
                id: 440
            }
        ];

        if (!args.item) {
            let embed = new MessageEmbed()
                .setTitle(`Invalid Item`)
                .setColor(`#f26666`)
                .setDescription(`Please enter an item name.`)
                .setTimestamp(Date())
                .setFooter('No steam market data', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }

        let Itemprice;
        let Itemimage;

        for (let i = 0; i < games.length; i++) {
            if (games[i].name == args.game) {
                console.log('Found');
                fetcher.getItemPrice(args.item, games[i].id).then((price) => Itemprice = price).catch((err) => console.log(err.message));
                fetcher.getItemImage(args.item, games[i].id).then((image) => Itemimage = image).catch((err) => console.log(err.message));
                break;
            }
        }

        let embed = new MessageEmbed()
                .setTitle(`${args.item}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Price: ${Itemprice}`)
                //.setImage(`${Itemimage}`)
                .setTimestamp(Date())
                .setFooter(`Item`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
    }
}

module.exports = SteamMarketCommand;
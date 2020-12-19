const {
    Command
} = require('discord-akairo');
const {
    MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');

class RedditCommand extends Command {
    constructor() {
        super('reddit', {
            aliases: ['reddit'],
            description: {
                content: "Send random images from the subreddit you choose",
                usage: 'reddit [subreddit]',
                examples: ['reddit dankmemes']
            },
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            args: [{
                id: 'sub',
                type: 'string',
                prompt: {
                    start: 'What subreddit do you want to browse?',
                    optional: true
                },
                default: 'random',
                match: 'rest'
            }],
            category: 'Fun',
            ratelimit: 2
        });
    }

    exec(message, args) {
        if (!args.sub) {
            return;
        }

        fetch('https://www.reddit.com/r/' + args.sub + '.json?limit=100').then((response) => {
            return response.json();
        }).then((response) => {
            //console.log(response);
            if (response.error == 404) {
                let embed = new MessageEmbed()
                    .setTitle(`Invalid Subreddit`)
                    .setColor(`#f26666`)
                    .setDescription(`I couldn't find the subreddit that you are looking for.`)
                    .setTimestamp(Date())
                    .setFooter('HTTP Error 404', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(embed);
            }

            if (response.data.dist == 0) {
                let embed = new MessageEmbed()
                    .setTitle(`Invalid Subreddit`)
                    .setColor(`#f26666`)
                    .setDescription(`I couldn't find the subreddit that you are looking for.`)
                    .setTimestamp(Date())
                    .setFooter('No Data', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(embed);
            }

            let i = Math.floor((Math.random() * response.data.children.length));
            if (response.data.children[i].data.over_18 == true && !message.channel.nsfw) {
                let embed = new MessageEmbed()
                    .setTitle(`NSFW`)
                    .setColor(`#f26666`)
                    .setDescription(`I am unable to send this content here. This channel is not an NSFW channel!`)
                    .setTimestamp(Date())
                    .setFooter('Discord ToS issue', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.util.send(embed);
            }

            const redditEmbed = this.client.util.embed()
                .setColor('#FF5700')
                .setTitle(response.data.children[i].data.title)
                .setDescription(response.data.children[i].data.selftext)
                .setURL('https://reddit.com' + response.data.children[i].data.permalink)
                .setFooter(`/r/${response.data.children[i].data.subreddit} | ⬆ ${response.data.children[i].data.ups} 🗨 ${response.data.children[i].data.num_comments}`);

            message.util.send(redditEmbed);
            message.util.send(response.data.children[i].data.url)
        });
    }
}

module.exports = RedditCommand;
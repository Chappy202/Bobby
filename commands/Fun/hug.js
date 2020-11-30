const {
    Command
} = require("discord-akairo");
const Discord = require("discord.js");
const fetch = require("node-superfetch");

class HugCommand extends Command {
    constructor() {
        super("hug", {
            aliases: ["hug"],
            description: {
                content: "Hugs the person you tag",
                usage: 'hug <user>',
                examples: ['hug @Bobby']
            },
            category: 'Fun',
        });

        this.name = "hug"
    }

    async exec(msg) {
        let user = msg.mentions.users.first()
        if (!user) return msg.util.send(new Discord.MessageEmbed().setTitle("Couln't find user").setColor('#f26666').setDescription(`Make sure to tag someone!`).setTimestamp(Date()).setFooter('Argument error', 'https://chappy202.com/bobby-project/images/avatar.png'));
        if (msg.author.id === user.id) return msg.util.send(new Discord.MessageEmbed().setTitle("Hug ❤").setColor('#e879d5').setDescription(`Hug yourself ❤`).setTimestamp(Date()));

        const {
            body: hug
        } = await fetch.get("https://nekos.life/api/hug");

        let em = new Discord.MessageEmbed()
            .setTitle("Hug ❤")
            .setColor('#e879d5')
            .setDescription(`${msg.author.tag} Hugs ${user.tag}`)
            .setImage(hug.url)
            .setTimestamp(Date())

        return msg.util.send(em)

    }
}

module.exports = HugCommand;
const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require('discord-akairo');
const {
    token,
    bobbyOwner
} = require('./config.json');


class Bobby extends AkairoClient {
    constructor() {
        super({
            // Options for Akairo go here
            ownerID: bobbyOwner,
        }, {
            // Options for Discord.js go here
            disableMentions: 'everyone'
        });

        this.CommandHandler = new CommandHandler(this, {
            // Options for the command handler go here
            // Location of the commands
            directory: './commands/',
            // Prefix that can be used for commands
            prefix: ['?', '!', '-', '='],
            // Prevent other bots from running bobby commands
            blockBots: true,
            // Prevent bobby from running its own commands
            blockClient: true,
            // Can mention the bot as a prefix
            allowMention: true,
            // 2 Second default command cooldown
            defaultCooldown: 2000,
            // Enable to utility class that can work with responses
            commandUtil: true
        });

        this.ListenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });

        this.ListenerHandler.setEmitters({
            commandHandler: this.CommandHandler,
            listenerHandler: this.ListenerHandler
        });

        this.CommandHandler.useListenerHandler(this.ListenerHandler);
        this.ListenerHandler.loadAll();
        this.CommandHandler.loadAll();
    }
}

const client = new Bobby();
client.login(token);
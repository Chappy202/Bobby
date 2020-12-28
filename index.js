const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require('discord-akairo');
const {
    Player
} = require('discord-music-player');
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

        this.player = new Player(this, {
            leaveOnEnd: false,
            leaveOnStop: true,
            leaveOnEmpty: false,
            timeout: 5000,
            quality: 'high',
        });

        this.CommandHandler.useListenerHandler(this.ListenerHandler);
        this.ListenerHandler.loadAll();
        this.CommandHandler.loadAll();
    }
}

const Logger = require('./utils/Logger');

const client = new Bobby();

client
    .on("shardDisconnect", () => Logger.warn("Connection lost..."))
    .on("shardReconnecting", () => Logger.warn("Attempting to reconnect..."))
    .on("shardError", () => Logger.err("Connection Error..."))
    .on("shardResume", () => Logger.info("Reconnected!"))
    .on("shardReady", () => Logger.info("Connected!"))
    .on("error", err => Logger.error(err))
    .on("warn", info => Logger.warn(info));

client.login(token);
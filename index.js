const {
    AkairoClient,
    CommandHandler,
    ListenerHandler
} = require('discord-akairo');
const { Structures } = require('discord.js');
const {
    token,
    bobbyOwner
} = require('./config.json');

Structures.extend("Guild", function(Guild){
    class MusicGuild extends Guild {
        constructor(client, data) {
            super(client, data);
            this.musicData = {
              queue: [],
              isPlaying: false,
              nowPlaying: null,
              songDispatcher: null,
              volume: 1
            };
            this.triviaData = {
              isTriviaRunning: false,
              wasTriviaEndCalled: false,
              triviaQueue: [],
              userGuessed: new Map(),
              triviaScore: new Map()
            };
          }
    }
    return MusicGuild;
});

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

const Logger = require('./utils/Logger');

const client = new Bobby();

client
    .on("shardDisconnect", () => Logger.warn("Connection lost..."))
    .on("shardReconnecting", () => Logger.info("Attempting to reconnect..."))
    .on("error", err => Logger.error(err))
    .on("warn", info => Logger.warn(info));

client.login(token);
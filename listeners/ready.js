const { Listener } = require('discord-akairo');
const Logger = require('../utils/Logger');

class Ready extends Listener {
    constructor() {
        super('ready', {
            event: 'ready',
            emitter: 'client',
            category: 'client'
        });
    }
    exec(){
        this.client.user.setActivity("OHGT", { type: "LISTENING" });
        Logger.info(`${this.client.user.tag} is ready to rumble!!`);
    }
}

module.exports = Ready;
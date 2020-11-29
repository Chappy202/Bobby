const { Listener } = require('discord-akairo');

class Ready extends Listener {
    constructor() {
        super('ready', {
            event: 'ready',
            emitter: 'client'
        });
    }
    exec(){
        this.client.user.setActivity("OHGT", { type: "LISTENING" });
        console.log(`I'm ready to rumble!`);
    }
}

module.exports = Ready;
const {
    Listener
} = require('discord-akairo');
// Get the Discordjs Embed functionality
const {
    MessageEmbed
} = require('discord.js');

class SongChangedListener extends Listener {
    constructor() {
        super('songChanged', {
            emitter: 'client',
            event: 'songChanged'
        });
    }

    exec(message, oldSong, newSong, skipped, repeatMode) {
        if (repeatMode) {
            let embed = new MessageEmbed()
                .setTitle(`Playing ➤ ${newSong.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Duration: ${newSong.duration}\nAuthor: ${newSong.author}\nRepeat: true`)
                .setThumbnail(`${newSong.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${newSong.requestedBy}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setTitle(`Ended: ${oldSong.name} Playing ➤ ${newSong.name}`)
                .setURL(`${song.url}`)
                .setColor(`#6bcbd8`)
                .setDescription(`Duration: ${song.duration}\nAuthor: ${song.author}`)
                .setThumbnail(`${song.thumbnail}`)
                .setTimestamp(Date())
                .setFooter(`Requested by: ${song.requestedBy} | Skipped: ${skipped}`, 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }
        
    }
}

module.exports = SongChangedListener;
const {
    Command
} = require("discord-akairo");
const {
    MessageEmbed
} = require("discord.js");
const Youtube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const {
    youtubeAPI
} = require('../../config.json');
const youtube = new Youtube(youtubeAPI);

class PlayCommand extends Command {
    constructor() {
        super("play", {
            aliases: ["play", "play-song", "add"],
            category: "Music",
            description: {
                content: "Play any song or playlist from youtube"
            },
            guildOnly: true,
            clientPermissions: ["SPEAK", "CONNECT"],
            throttling: {
                usages: 2,
                duration: 5
            },
            * args() {
                const query = yield {
                    match: "content",
                    prompt: {
                        start: (msg, text) =>
                            `What song or playlist would you like to listen to?`
                    },
                    type: "string",
                    validate: function (query) {
                        return query.length > 0 && query.length < 200;
                    }
                };
                return {
                    query
                };
            }
        });
    }

    async exec(message, {
        query
    }) {
        const author = message.author;
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            let embed = new MessageEmbed()
                .setTitle(`No user found in voice channel`)
                .setColor(`#f26666`)
                .setDescription(`Join a voice channel and try again`)
                .setTimestamp(Date())
                .setFooter('Channel error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }

        if (message.guild.triviaData.isTriviaRunning == true) {
            let embed = new MessageEmbed()
                .setTitle(`Trivia running!`)
                .setColor(`#f26666`)
                .setDescription(`Try again after the trivia has ended.`)
                .setTimestamp(Date())
                .setFooter('Trivia error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.util.send(embed);
        }

        if (
            // if the user entered a youtube playlist url
            query.match(
                /^(?!.*\?.*\bv=)https:\/\/www\.youtube\.com\/.*\?.*\blist=.*$/
            )
        ) {
            const playlist = await youtube.getPlaylist(query).catch(function () {
                let embed = new MessageEmbed()
                    .setTitle(`Unable to find playlist`)
                    .setColor(`#f26666`)
                    .setDescription(`Playlist is either private or id doesn't exist!`)
                    .setTimestamp(Date())
                    .setFooter('Playlist error', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.channel.send(embed);
            });
            // remove the 10 if you removed the queue limit conditions below
            const videosObj = await playlist.getVideos(10).catch(function () {
                let embed = new MessageEmbed()
                    .setTitle(`Unable to get video`)
                    .setColor(`#f26666`)
                    .setDescription(`There was a problem getting one of the videos in the playlist!`)
                    .setTimestamp(Date())
                    .setFooter('Playlist error', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.channel.send(embed);
            });
            for (let i = 0; i < videosObj.length; i++) {
                const video = await videosObj[i].fetch();
                // this can be uncommented if you choose to limit the queue
                // if (message.guild.musicData.queue.length < 10) {
                //
                message.guild.musicData.queue.push(
                    PlayCommand.constructSongObj(video, voiceChannel, author)
                );
                // } else {
                //   return message.channel.send(
                //     `I can't play the full playlist because there will be more than 10 songs in queue`
                //   );
                // }
            }
            if (message.guild.musicData.isPlaying == false) {
                message.guild.musicData.isPlaying = true;
                return PlayCommand.playSong(message.guild.musicData.queue, message);
            } else if (message.guild.musicData.isPlaying == true) {
                let embed = new MessageEmbed()
                    .setTitle(`Playlist added`)
                    .setColor(`#6bcbd8`)
                    .setDescription(`Playlist - :musical_note:  ${playlist.title} :musical_note: has been added to queue`)
                    .setTimestamp(Date())
                return message.channel.send(embed);
            }
        }

        // This if statement checks if the user entered a youtube url, it can be any kind of youtube url
        if (query.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)) {
            query = query
                .replace(/(>|<)/gi, "")
                .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            const id = query[2].split(/[^0-9a-z_\-]/i)[0];
            const video = await youtube.getVideoByID(id).catch(function () {
                let embed = new MessageEmbed()
                    .setTitle(`Unable to get video`)
                    .setColor(`#f26666`)
                    .setDescription(`There was a problem getting the video you provided!`)
                    .setTimestamp(Date())
                    .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.channel.send(embed);
            });
            // // can be uncommented if you don't want the bot to play live streams
            // if (video.raw.snippet.liveBroadcastContent === 'live') {
            //   return message.channel.send("I don't support live streams!");
            // }
            // // can be uncommented if you don't want the bot to play videos longer than 1 hour
            // if (video.duration.hours !== 0) {
            //   return message.channel.send('I cannot play videos longer than 1 hour');
            // }
            // // can be uncommented if you want to limit the queue
            // if (message.guild.musicData.queue.length > 10) {
            //   return message.channel.send(
            //     'There are too many songs in the queue already, skip or wait a bit'
            //   );
            // }
            message.guild.musicData.queue.push(
                PlayCommand.constructSongObj(video, voiceChannel)
            );
            if (
                message.guild.musicData.isPlaying == false ||
                typeof message.guild.musicData.isPlaying == "undefined"
            ) {
                message.guild.musicData.isPlaying = true;
                return PlayCommand.playSong(message.guild.musicData.queue, message);
            } else if (message.guild.musicData.isPlaying == true) {
                let embed = new MessageEmbed()
                    .setTitle(`Song added`)
                    .setColor(`#6bcbd8`)
                    .setDescription(`${video.title} added to queue`)
                    .setTimestamp(Date())
                return message.channel.send(embed);
            }
        }

        // if user provided a song/video name
        const videos = await youtube.searchVideos(query, 10).catch(function () {
            let embed = new MessageEmbed()
                .setTitle(`Unable to get video`)
                .setColor(`#f26666`)
                .setDescription(`There was a problem searching the video you requested :(`)
                .setTimestamp(Date())
                .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.channel.send(embed);
        });
        if (videos.length < 10) {
            let embed = new MessageEmbed()
                .setTitle(`Unable to get video`)
                .setColor(`#f26666`)
                .setDescription(`I had some trouble finding what you were looking for, please try again or be more specific`)
                .setTimestamp(Date())
                .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
            return message.channel.send(embed);
        }
        const vidNameArr = [];
        for (let i = 0; i < videos.length; i++) {
            vidNameArr.push(`${videos[i].title}`);
        }
        vidNameArr.push("exit");
        const embed = this.client.util
            .embed()
            .setColor("#6bcbd8")
            .setAuthor("Bobby Song Selection.", this.client.user.displayAvatarURL())
            .setDescription(
                `Choose a song by commenting a number between 1 and 10
Song 1  : ${vidNameArr[0]}
Song 2  : ${vidNameArr[1]}
Song 3  : ${vidNameArr[2]}
Song 4  : ${vidNameArr[3]}
Song 5  : ${vidNameArr[4]}
Song 6  : ${vidNameArr[5]}
Song 7  : ${vidNameArr[6]}
Song 8  : ${vidNameArr[7]}
Song 9  : ${vidNameArr[8]}
Song 10 : ${vidNameArr[9]}
Type \`exit\` to exit menu and cancel song selection.`
            )
            .setFooter("Requested By: " + message.author.tag)
            .setTimestamp();
        var songEmbed = await message.util.send({
            embed
        });
        message.channel
            .awaitMessages(
                function (msg) {
                    return (msg.content > 0 && msg.content < 11) || msg.content === "exit";
                }, {
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }
            )
            .then(function (response) {
                const videoIndex = parseInt(response.first().content);
                if (response.first().content === "exit") {
                    songEmbed.channel.send("Song selection canceled.");
                    return songEmbed.delete();
                }
                youtube
                    .getVideoByID(videos[videoIndex - 1].id)
                    .then(function (video) {
                        // // can be uncommented if you don't want the bot to play live streams
                        // if (video.raw.snippet.liveBroadcastContent === 'live') {
                        //   songEmbed.delete();
                        //   return message.channel.send("I don't support live streams!");
                        // }

                        // // can be uncommented if you don't want the bot to play videos longer than 1 hour
                        // if (video.duration.hours !== 0) {
                        //   songEmbed.delete();
                        //   return message.channel.send('I cannot play videos longer than 1 hour');
                        // }

                        // // can be uncommented if you don't want to limit the queue
                        // if (message.guild.musicData.queue.length > 10) {
                        //   songEmbed.delete();
                        //   return message.channel.send(
                        //     'There are too many songs in the queue already, skip or wait a bit'
                        //   );
                        // }
                        message.guild.musicData.queue.push(
                            PlayCommand.constructSongObj(video, voiceChannel, author)
                        );
                        if (message.guild.musicData.isPlaying == false) {
                            message.guild.musicData.isPlaying = true;
                            if (songEmbed) {
                                songEmbed.delete();
                            }
                            PlayCommand.playSong(message.guild.musicData.queue, message);
                        } else if (message.guild.musicData.isPlaying == true) {
                            if (songEmbed) {
                                songEmbed.delete();
                            }
                            let embed = new MessageEmbed()
                                .setTitle(`Song added`)
                                .setColor(`#6bcbd8`)
                                .setDescription(`${video.title} added to queue`)
                                .setTimestamp(Date())
                            return message.channel.send(embed);
                        }
                    })
                    .catch(function () {
                        if (songEmbed) {
                            songEmbed.delete();
                        }
                        let embed = new MessageEmbed()
                            .setTitle(`Unable to get ID`)
                            .setColor(`#f26666`)
                            .setDescription(`An error has occured when trying to get the video ID from youtube`)
                            .setTimestamp(Date())
                            .setFooter('YouTube error', 'https://chappy202.com/bobby-project/images/avatar.png');
                        return message.channel.send(embed);
                    });
            })
            .catch(function () {
                if (songEmbed) {
                    songEmbed.delete();
                }
                let embed = new MessageEmbed()
                    .setTitle(`Unable to get song`)
                    .setColor(`#f26666`)
                    .setDescription(`Please try again and enter a number between 1 and 10 or exit`)
                    .setTimestamp(Date())
                    .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
                return message.channel.send(embed);
            });
    }
    static playSong(queue, message) {
        const classThis = this; // use classThis instead of 'this' because of lexical scope below
        queue[0].voiceChannel
            .join()
            .then(function (connection) {
                const dispatcher = connection
                    .play(
                        ytdl(queue[0].url, {
                            quality: "highestaudio",
                            highWaterMark: 1024 * 1024 * 10
                        })
                    )
                    .on("start", function () {
                        message.guild.musicData.songDispatcher = dispatcher;
                        dispatcher.setVolume(message.guild.musicData.volume);
                        const videoEmbed = new MessageEmbed()
                            .setImage(queue[0].thumbnail)
                            .setTitle("Now Playing " + queue[0].title)
                            .setURL(queue[0].url)
                            .setDescription("Duration: " + queue[0].duration)
                            .setColor("#6bcbd8")
                            .setFooter("Requested By: " + message.author.tag)
                            .setTimestamp();
                        if (queue[1])
                            videoEmbed.setDescription(`Duration: ${queue[0].duration}
Next Song:
**${queue[1].title}**`);
                        message.channel.send(videoEmbed);
                        message.guild.musicData.nowPlaying = queue[0];
                        return queue.shift();
                    })
                    .on("finish", function () {
                        if (queue.length >= 1) {
                            return classThis.playSong(queue, message);
                        } else {
                            message.guild.musicData.isPlaying = false;
                            message.guild.musicData.nowPlaying = null;
                            message.guild.musicData.songDispatcher = null;
                            let embed = new MessageEmbed()
                                .setTitle(`Queue Empty`)
                                .setColor(`#6bcbd8`)
                                .setDescription(`There aren't any songs in the queue. Leaving channel.`)
                                .setTimestamp(Date())
                            message.channel.send(embed);
                            return message.guild.me.voice.channel.leave();
                        }
                    })
                    .on("error", function (e) {
                        let embed = new MessageEmbed()
                            .setTitle(`Playback failed`)
                            .setColor(`#f26666`)
                            .setDescription(`Cannot play song`)
                            .setTimestamp(Date())
                            .setFooter('Song error', 'https://chappy202.com/bobby-project/images/avatar.png');
                        message.channel.send(embed);
                        console.error(e);
                        message.guild.musicData.queue.length = 0;
                        message.guild.musicData.isPlaying = false;
                        message.guild.musicData.nowPlaying = null;
                        message.guild.musicData.songDispatcher = null;
                        return message.guild.me.voice.channel.leave();
                    });
            })
            .catch(function (e) {
                console.error(e);
                return message.guild.me.voice.channel.leave();
            });
    }
    static constructSongObj(video, voiceChannel, author) {
        let duration = this.formatDuration(video.duration);
        if (duration == "00:00") duration = "Live Stream";
        return {
            url: `https://www.youtube.com/watch?v=${video.raw.id}`,
            title: video.title,
            rawDuration: video.duration,
            duration,
            thumbnail: video.thumbnails.high.url,
            voiceChannel,
            author
        };
    }
    // prettier-ignore
    static formatDuration(durationObj) {
        const duration = `${durationObj.hours ? (durationObj.hours + ':') : ''}${
      durationObj.minutes ? durationObj.minutes : '00'
    }:${
      (durationObj.seconds < 10)
        ? ('0' + durationObj.seconds)
        : (durationObj.seconds
        ? durationObj.seconds
        : '00')
    }`;
        return duration;
    }
}

module.exports = PlayCommand;
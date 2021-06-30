const ytdl = require('ytdl-core');
const ytapi = require('simple-youtube-api');

const { musicTime, logTime } = require('../utils/utils');
const { MessageEmbed, WebhookClient } = require('discord.js');
const { yellow, green } = require('chalk');

let guildid = "658437922256584725"

module.exports = {
    name: 'play',
    async execute(interaction, client) {
        let member = client.channels.cache.get("659528441967804416").members.get(interaction.member.user.id)
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            console.log(`[WARN] [${logTime()}]`, yellow(`${member.user.username}#${member.user.discriminator} n'a pas pu mettre de musique, il n'était pas connecté à un salon vocal.`));
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: undefined,
                        embeds: [{
                            type: "rich",
                            color: 16763981,
                            description: "**:warning: Tu dois être dans un salon vocal pour pouvoir jouer de la musique !**",
                            timestamp: new Date(),
                        }]
                    },
                },
            })
            return
        }
        const permissions = voiceChannel.permissionsFor(client.user);
        if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            console.log(`[WARN] [${logTime()}]`, yellow(`${member.user.username}#${member.user.discriminator} n'a pas pu mettre de musique, je n'ai pas la permission de la permission de parler et de me connecter dans le salon.`));
            await client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: undefined,
                        embeds: [{
                            type: "rich",
                            color: 16763981,
                            description: "**:warning: Il me faut la permission de parler et de me connecter à ton salon vocal pour que je puisse jouer de la musique**",
                            timestamp: new Date(),
                        }]
                    },
                },
            })
            return
        }
        execute(member, client.queue.get(guildid), interaction.data.options[0].value, interaction.channel_id, client, interaction);
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5,
                data: {
                    content: undefined,
                },
            },
        })
    },
};

async function execute(member, serverQueue, args, channelid, client, interaction) {
    const youtube = new ytapi(client.config.ytapikey)

    const queue = client.queue;
    const voiceChannel = member.voice.channel;

    channel = client.channels.cache.get(channelid)

    const url = args ? args.replace(/<(.+)>/g, '$1') : ''

    try {
        var video = await youtube.getVideoByID(url)
    } catch {
        var videos = await youtube.searchVideos(args, 2)
        var video = await youtube.getVideoByID(videos[0].id)
    }

    const song = {
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        tv: video.duration,
        addby: member.user.username,
        vidchan: video.channel.title,
    };
    if (!serverQueue) {
        const queueContruct = {
            textChannel: channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true,
        };
        queue.set(guildid, queueContruct);
        queueContruct.songs.push(song);


        try {
            queueContruct.connection = await voiceChannel.join();
            const playembed = new MessageEmbed()
                .setAuthor("Je suis en train de jouer :", `https://img.icons8.com/fluent/48/000000/circled-play.png`)
                .setFooter(client.user.username, client.user.avatarURL())
                .setTimestamp()
                .setTitle(`${song.title}`)
                .setURL(song.url)
                .addField("Ajouté par :", song.addby, true)
                .addField("Durée :", musicTime(song.tv.hours, song.tv.minutes, song.tv.seconds), true)
                .addField("Chaîne YT :", song.vidchan, true)
                .setColor("00ffff");
            const responseClient = new WebhookClient(client.user.id, interaction.token)
            responseClient.send(" ", {
                embeds: [playembed]
            })
            play(guildid, queueContruct.songs[0], queue, client);
            console.log(`[SONG] [${logTime()}]`, green(`Je joue la musique "${song.title}"`));
        } catch (err) {
            console.log(err);
            queue.delete(guildid);
            return channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        console.log(`[SONG] [${logTime()}]`, green(`La musique "${song.title}" à été ajoutée à la file d'attente.`));
        playembed = {
            type: "rich",
            color: 65535,
            title: song.title,
            author: {
                name: 'J\'ai ajouté à la playlist :',
                icon_url: 'https://img.icons8.com/fluent/48/000000/smart-playlist.png'
            },
            url: song.url,
            fields: [
                {
                    name: 'Ajouté par :',
                    value: song.addby,
                    inline: true,
                },
                {
                    name: 'Durée :',
                    value: musicTime(song.tv.hours, song.tv.minutes, song.tv.seconds),
                    inline: true,
                },
                {
                    name: 'Chaîne YT :',
                    value: song.vidchan,
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: client.user.username,
                icon_url: client.user.avatarURL(),
            },
        }
        const responseClient = new WebhookClient(client.user.id, interaction.token)
        responseClient.send(" ", { embeds: [playembed] })
    }
}

function play(guild, song, queue, client) {
    const serverQueue = queue.get(guild);
    if (!song) {
        queue.delete(guild);
        serverQueue.voiceChannel.leave();
        return;
    }
    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('speaking', state => {
            if (!state) {
                console.log(`[SONG] [${logTime()}]`, green(`La musique "${song.title}" est terminée.`));
                serverQueue.songs.shift();

                if (serverQueue.songs[0] === undefined) {
                    stopembed = {
                        type: "rich",
                        color: 65535,
                        description: "**<:stop:848062075803664404> Je n'ai plus de musique a lire. Je me déconnecte.**",
                    }
                    if (client.musicinteraction == null) {
                        serverQueue.textChannel.send({ embed: stopembed });
                    } else {
                        const responseClient = new WebhookClient(client.user.id, client.musicinteraction)
                        responseClient.send(" ", { embeds: [stopembed] })
                        client.musicinteraction = null
                    }

                    serverQueue.voiceChannel.leave();
                    queue.delete(guildid);
                    console.log(`[SONG] [${logTime()}]`, green(`Je n'ai plus aucune musique à jouer !`))
                }
                else {
                    play(guild, serverQueue.songs[0], queue, client)
                    console.log(`[SONG] [${logTime()}]`, green(`Je joue la musique "${serverQueue.songs[0].title}"`));

                    playembed = {
                        type: "rich",
                        color: 65535,
                        title: serverQueue.songs[0].title,
                        author: {
                            name: 'Je passe à la musique suivante :',
                            icon_url: 'https://img.icons8.com/fluent/48/000000/fast-forward-round.png'
                        },
                        url: serverQueue.songs[0].url,
                        fields: [
                            {
                                name: 'Ajouté par :',
                                value: serverQueue.songs[0].addby,
                                inline: true,
                            },
                            {
                                name: 'Durée :',
                                value: musicTime(serverQueue.songs[0].tv.hours, serverQueue.songs[0].tv.minutes, serverQueue.songs[0].tv.seconds),
                                inline: true,
                            },
                            {
                                name: 'Chaîne YT :',
                                value: serverQueue.songs[0].vidchan,
                                inline: true,
                            },
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: client.user.username,
                            icon_url: client.user.avatarURL(),
                        },
                    }

                    if (client.musicinteraction == null) {
                        serverQueue.textChannel.send({ embed: playembed });
                    } else {
                        const responseClient = new WebhookClient(client.user.id, client.musicinteraction)
                        responseClient.send(" ", { embeds: [playembed] })
                        client.musicinteraction = null
                    }
                }
            }
        })
        .on('error', error => {
            console.error(error);
            serverQueue.textChannel.send({
                embed: {
                    color: 16711680,
                    title: `<:bug:847181190317342761> Oh non ! Une erreur s'est produite !`,
                    description: `\`\`${error}\`\`\nSi la musique se stoppe, il vous suffit de faire !stop et de de recommencer.\nSi cela persiste merci de bien vouloir contacter Le Mocha.`,
                    timestamp: new Date(),
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.avatarURL(),
                    },
                }
            });
        });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
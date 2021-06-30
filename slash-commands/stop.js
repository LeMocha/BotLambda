const { WebhookClient } = require("discord.js");

module.exports = {
    name: 'stop',
    async execute (interaction, client) {
        let member = client.channels.cache.get(interaction.channel_id).members.get(interaction.member.user.id)
        
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 5,
              data: {
                content: undefined,
              },
            },
        })

        stop(member, client.queue.get(interaction.guild_id), interaction, client);
    },
};

function stop(member, serverQueue, interaction, client) {
    const responseClient = new WebhookClient(client.user.id,interaction.token)

    if (!member.voice.channel) {
        responseClient.send(" ", {
            embeds: [{
                type: "rich",
                color: 16763981,
                description: "**:warning: Tu dois être dans un channel vocal pour stopper la musique !**",
                timestamp: new Date(),
            }]
        })
        return
    }

    if (!serverQueue) {
        responseClient.send(" ", {
            embeds: [{
                type: "rich",
                color: 16763981,
                description: "**:warning: Il y a aucune musique que je puisse stopper !**",
                timestamp: new Date(),
            }]
        })
        return
    }

    if(serverQueue.connection.dispatcher === null){
        client.musicinteraction = interaction.token
        serverQueue.voiceChannel.leave();
        queue.delete(guildid);
        return
    }

    client.musicinteraction = interaction.token
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.pause();
    return
}
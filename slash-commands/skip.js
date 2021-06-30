const { yellow } = require("chalk");
const { WebhookClient } = require("discord.js");
const { logTime } = require("../utils/utils");

let guildid = "658437922256584725"

module.exports = {
    name: 'skip',
    async execute (interaction, client) {
        let member = client.channels.cache.get("659528441967804416").members.get(interaction.member.user.id)
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 5,
              data: {
                content: undefined,
              },
            },
        })
        skip(member, client.queue.get(guildid), client.queue, client, interaction);
    },
};

function skip(member, serverQueue, queue, client, interaction) {
    const responseClient = new WebhookClient(client.user.id,interaction.token)
    if (!member.voice.channel) {
        console.log(`[WARN] [${logTime()}]`, yellow(`${member.user.tag} n'a pas pu changer de musique, il n'était pas connecté à un salon vocal.`));
        responseClient.send(" ", {
            embeds: [{
                type: "rich",
                color: 16763981,
                description: "**:warning: Tu dois être dans un channel vocal pour passer à la musique suivante !**",
                timestamp: new Date(),
            }]
        })
        return
    }
    else if (!serverQueue) {
        console.log(`[WARN} [${logTime()}]`, yellow(`${member.user.tag} n'a pas pu changer de musique, il n'y a pas de musique à changer.`));
        responseClient.send(" ", {
            embeds: [{
                type: "rich",
                color: 16763981,
                description: "**:warning: Il y a aucune musique que je puisse passer !**",
                timestamp: new Date(),
            }]
        })
        return
    }
    else if(serverQueue.connection.dispatcher === null){
        client.musicinteraction = interaction.token
        serverQueue.voiceChannel.leave();
        queue.delete(guildid);
    } else {
        client.musicinteraction = interaction.token
        serverQueue.connection.dispatcher.pause();
    }
}
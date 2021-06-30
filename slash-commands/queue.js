const { MessageEmbed, WebhookClient } = require("discord.js");
const { getUserFromMention } = require("../utils/mentions");

let guildid = "658437922256584725"

module.exports = {
    name: 'queue',
    async execute (interaction, client) {

        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 5,
              data: {
                content: undefined,
              },
            },
        })
        const responseClient = new WebhookClient(client.user.id,interaction.token)

        let member = getUserFromMention(client, interaction.member.user.id)
        const serverQueue = client.queue.get(guildid);

        if(!serverQueue){
            responseClient.send(" ", {
                embeds: [{
                    type: "rich",
                    color: 16763981,
                    description: "**:warning: La fille d'attente est vide !**",
                    timestamp: new Date(),
                }]
            })
            return
        }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(`<:playlist:848905408293634099> La liste de toute les musiques en file d'attente`)
            .setColor("00ffff")
            .setFooter(`Lancé par ${member.username}`, member.displayAvatarURL());

        let songs = "";
        let i = 0;
        serverQueue.songs.forEach(song => {
            if(i === 0){
                songs += `**Lecture en cours : **${song.title}\n\n`;
                i++
            } else{
                songs += `${i}- ${song.title}\n*Ajoutée Par :*  \`\`${song.addby}\`\`\n`
                i++
            }
        });
        if(i === 1){
            songs += `Aucun titre en file d'attente.`
        }
        embed.setDescription(songs);
        
        responseClient.send(" ", {
            embeds: [embed]
        })
    },
};
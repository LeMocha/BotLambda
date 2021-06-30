const { MessageEmbed } = require("discord.js");
const { utc } = require("moment");
const { isBot } = require("../utils/utils");

module.exports = {
    name: 'userinfo',
    async execute (interaction, client) {
        let member

        if(interaction.data.options == undefined){
            member = client.channels.cache.get("659528441967804416").members.get(`${interaction.member.user.id}`)
        } else {
            member = gufm(interaction, interaction.data.options[0].value, client)
        }

        if(member === undefined) {
            member = client.channels.cache.get("659528441967804416").get(interaction.data.options[0].value)
        }

        if(member === undefined) {
            return "Je ne trouve pas cet utilisateur."
        }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(`À propos de : ${member.user.username}`)
            .addFields(
                { name: "📌 Discord Tag :", value: `\`\`${member.user.tag}\`\``, inline: true },
                { name: "🖊️ Discord Id :", value: `\`\`${member.id}\`\``, inline: true },
                { name: "🤖 Bot ?", value: `\`\`${isBot(member)}\`\``, inline: true },
            )
            .addField("🍼 Compte créé le :", `\`\`${utc(member.user.createdTimestamp).format("D/MM/YYYY - LTS")}\`\``, true)
            .addField("🗓️ A rejoint le :", `\`\`${utc(member.joinedTimestamp).format("D/MM/YYYY - LTS")}\`\``, true)
            .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
            .setFooter("Note : Les heures affichées sont au format 24 heures à horaire UTC.", client.user.avatarURL())
            .setColor(member.displayHexColor);
            member.lastMessage == null || embed.addField("📤 Dernier message envoyé le :", `\`\`${utc(member.lastMessage.createdTimestamp).format("D/MM/YYYY - LTS")}\`\``, false)

            let nbroles = 0
            let listroles = [];
            let proles = ""

            member.roles._roles.forEach(memrole => {
                if(memrole.rawPosition == 0){}
                else{
                    listroles.push({
                        key: memrole.rawPosition,
                        id: memrole
                    });
                    nbroles++
                }
            });
                
            listroles.sort(function compare(a, b) {

                if (a.key > b.key)
                   return -1;
                if (a.key < b.key )
                    return 1;
                return 0;
            });

            listroles.forEach(memrole => {
                proles +=  `${memrole.id} →  `;
            })

        embed.addField(`🗒️ Possède ${nbroles} rôle(s) :`, proles.slice(0, -4), false)
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: undefined,
                embeds: [embed]
              },
            },
          });
    },
};

function gufm(interaction, mention, client){
    if (!mention) return;
    
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
    }
    return client.channels.cache.get(interaction.channel_id).members.get(mention);
}
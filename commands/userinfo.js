const { MessageEmbed } = require('discord.js');
const { utc } = require('moment');
const { getUserFromMentionWithMessages } = require('../utils/mentions');
const { isBot } = require('../utils/utils');

module.exports = {
    name: 'userinfo',
    description: 'En savoir plus à propos d\'un utilisateur',
    args: true,
    guildOnly: true,
    usage: "<user mention> / <user id>",
    category: "moderation",
    execute(message, args, client) {

            let member = getUserFromMentionWithMessages(message, args[0])
            if(member === undefined) {
                member = message.guild.members.cache.get(args[0])
            }
            if(member === undefined) {
                message.channel.send("Je ne trouve pas cet utilisateur.")
                return
            }

            const embed = new MessageEmbed()
                .setTimestamp()
                .setTitle(`À propos de : ${member.user.username}`)
                .addFields(
                    { name: "📌  Discord Tag :", value: `\`\`${member.user.tag}\`\``, inline: true },
                    { name: "🖊️  Discord Id :", value: `\`\`${member.id}\`\``, inline: true },
                    { name: "🤖  Bot ?", value: `\`\`${isBot(member)}\`\``, inline: true },
                )
                .addField("🍼  Compte créé le :", `\`\`${utc(member.user.createdTimestamp).format("D/MM/YYYY - h:mm:ss a")}\`\``, true)
                .addField("🗓️  A rejoint le :", `\`\`${utc(member.joinedTimestamp).format("D/MM/YYYY - h:mm:ss a")}\`\``, true)
                .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
                .setColor(member.displayHexColor);
                try{
                    embed.addField("📤  Dernier message envoyé le :", `\`\`${utc(member.lastMessage.createdTimestamp).format("D/MM/YYYY - h:mm:ss a")}\`\``, false)
                } catch {
                    embed.addField("📤  Dernier message envoyé le :", `\`\`Impossible de récupérer cette info.\`\``, false)
                }
                memrol = member.roles

                let proles = ""
                member._roles.forEach(memrole => {
                    proles +=  `<@&${memrole}> -  `;
                });

                embed.addField("🗒️  Possède les rôles :", proles.slice(0, -4), false)

            message.channel.send(embed)
    },
}
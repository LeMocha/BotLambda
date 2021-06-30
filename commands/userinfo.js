const { MessageEmbed } = require('discord.js');
const { utc, locale } = require('moment');
const { getUserFromMentionWithMessages } = require('../utils/mentions');
const { isBot } = require('../utils/utils');
locale('fr')

module.exports = {
    name: 'userinfo',
    description: 'En savoir plus à propos d\'un utilisateur',
    args: false,
    guildOnly: true,
    aliases: ['stats','user','uinfo'],
    usage: "<user mention> / <user id>",
    category: "moderation",
    execute(message, args, client) {
        message.delete()

        let member

        if(!args[0]){
            member = getUserFromMentionWithMessages(message, `${message.author.id}`)
        } else {
            member = getUserFromMentionWithMessages(message, args[0])
        }

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
                { name: "<:tag:847181191073234975> Discord Tag :", value: `\`\`${member.user.tag}\`\``, inline: true },
                { name: "<:id:847181190347882556> Discord Id :", value: `\`\`${member.id}\`\``, inline: true },
                { name: "<:bot:847186160483565628> Bot ?", value: `\`\`${isBot(member)}\`\``, inline: true },
            )
            .addField("<:calendrier:847195607147872266> Compte créé le :", `\`\`${utc(member.user.createdTimestamp).format("D/MM/YYYY - LTS")}\`\``, true)
            .addField("<:join:847195607939678218> A rejoint le :", `\`\`${utc(member.joinedTimestamp).format("D/MM/YYYY - LTS")}\`\``, true)
            .setThumbnail(client.users.cache.get(member.id).displayAvatarURL())
            .setFooter("Note : Les heures affichées sont au format 24 heures à horaire UTC.", message.client.user.avatarURL())
            .setColor(member.displayHexColor);
            member.lastMessage == null || embed.addField("<:message:847181191446528070> Dernier message envoyé le :", `\`\`${utc(member.lastMessage.createdTimestamp).format("D/MM/YYYY - LTS")}\`\``, false)

            let nbroles = 0
            let listroles = [];
            let proles = ""

            member._roles.forEach(memrole => {
                let roleencours = message.guild.roles.cache.find(r => r.id === memrole)
                listroles.push({
                    key: roleencours.rawPosition,
                    id: memrole
                });
                nbroles++
            });
                
            listroles.sort(function compare(a, b) {

                if (a.key > b.key)
                   return -1;
                if (a.key < b.key )
                    return 1;
                return 0;
            });

            listroles.forEach(memrole => {
                proles +=  `<@&${memrole.id}> →  `;
            })

        embed.addField(`<:roles:847181191273775115> Possède ${nbroles} rôle(s) :`, proles.slice(0, -4), false)

        message.channel.send(embed)
    },
}
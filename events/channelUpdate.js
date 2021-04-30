const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelUpdate',
    async execute(client, channel) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_UPDATE',
        });

        const { executor, changes } = fetchedLogs.entries.first();

        const logembed = new MessageEmbed()
            .setTitle("Un salon a été modifié !")
            .addField(':robot: Modifié par :', `${executor.username}#${executor.discriminator}`, true)
            .addField('🗃️ Catégorie :', `${channel.parent}`, true)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nSalon = ${channel.id}\nCategorie = ${channel.parent.id}\`\`\``, false)
            .addField(':bookmark_tabs: Salon :', `${channel.name}`, true)
            .addField('-----', "**Changements :**", false)
            .setTimestamp()
            .setColor(3426654)

        let cancel = 0

        changes.forEach(changes => {
            if(changes.key == "name") {
                logembed.addField("Nom :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            } else if(changes.key == "position") {
                cancel = 1
                return
            } else if(changes.key == "topic") {
                logembed.addField("Description :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            } else if(changes.key == "rate_limit_per_user") {
                logembed.addField("Cooldown :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            }  else if(changes.key == "nsfw") {
                logembed.addField("NSFW :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            } else if(changes.key == "type") {
                logembed.addField("Type :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            }
        });

        logchannel.send(logembed);
    }
};
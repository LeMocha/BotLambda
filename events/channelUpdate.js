const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelUpdate',
    async execute(client, channel) {

        if(channel.guild.id !== "658437922256584725") return;

        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_UPDATE',
        });

        const { executor, changes, createdTimestamp } = fetchedLogs.entries.first();

        var now = new Date().getTime()
        if (now-createdTimestamp>2) return;

        if (executor.id == client.user.id) return;

        const logembed = new MessageEmbed()
            .setTitle("<:editedsalon:848060548082827294> Un salon a été modifié !")
            .addField('<:utilisateur:847181191530151993> Modifié par :', `${executor.username}#${executor.discriminator}`, true)
            .addField('<:type:847195608736727060> Catégorie :', `${channel.parent}`, true)
            .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nSalon = ${channel.id}\`\`\``, false)
            .addField('<:salon:847197984831438848> Salon :', `${channel.name}`, true)
            .addField('-----', "**Changements :**", false)
            .setTimestamp()
            .setColor("#eab676")

        let cancel = 0

        changes.forEach(changes => {
            if(changes.key == "name") {
                logembed.addField("Nom :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            } else if(changes.key == "topic") {
                logembed.addField("Description :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            } else if(changes.key == "rate_limit_per_user") {
                logembed.addField("Cooldown :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            }  else if(changes.key == "nsfw") {
                logembed.addField("NSFW :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            } else if(changes.key == "type") {
                logembed.addField("Type :", `Ancien : ${changes.old}\nNouveau : ${changes.new}`, true)
            } else {
                cancel = 1
                return
            }
        });

        console.log("Je m'exécute ?")
        cancel == "1" || logchannel.send(logembed);
        console.log("Fin !")
    }
};
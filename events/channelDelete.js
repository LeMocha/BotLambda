const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelDelete',
    async execute(client, channel) {

        if(channel.guild.id !== "658437922256584725") return;

        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_DELETE',
        });

        const { executor, createdTimestamp } = fetchedLogs.entries.first();

        var now = new Date().getTime()
        if (now-createdTimestamp>2) return;

        if (executor.id == client.user.id) return;

        const logembed = new MessageEmbed()
            .setTitle(`<:salondelete:847195607730225163> Un salon a été supprimé !`)
            .addField('<:type:847195608736727060> Type de salon :', `${channel.type}`, true)
            .addField('<:rolecreate:847195608040734740> Catégorie :', `${channel.parent}`, true)
            .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nSalon = ${channel.id}\nCategorie = ${channel.parent.id}\`\`\``, false)
            .addField('<:salon:847197984831438848> Salon :', `${channel.name}`, true)
            .addField('<:utilisateur:847181191530151993> Suppr. par :', `${executor.username}#${executor.discriminator}`, true)
            .setTimestamp()
            .setColor("#eab676")
        logchannel.send(logembed);
    }
};
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'roleCreate',
    async execute(client, role) {

        if(role.guild.id !== "658437922256584725") return;

        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_CREATE',
        });

        const { executor } = fetchedLogs.entries.first();

        const logembed = new MessageEmbed()
            .setTitle(`⚒<:rolecreate:847195608040734740> Un rôle a été créé !`)
            .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nRole = ${role.id}\`\`\``, false)
            .addField('<:roles:847181191273775115> Rôle :', `${role.name}`, true)
            .addField('<:utilisateur:847181191530151993> Créé par :', `${executor.username}#${executor.discriminator}`, true)
            .setTimestamp()
            .setColor("#DE1FD5")
        logchannel.send(logembed);

    }
};
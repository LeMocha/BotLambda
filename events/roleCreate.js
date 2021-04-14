const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'roleCreate',
    async execute(client, role) {

        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'ROLE_CREATE',
        });

        const { executor } = fetchedLogs.entries.first();

        const logembed = new MessageEmbed()
            .setTitle(`⚒️ Un rôle a été créé !`)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nRole = ${role.id}\`\`\``, false)
            .addField(':bookmark_tabs: Rôle :', `${role.name}`, true)
            .addField(':robot: Créé par :', `${executor.username}#${executor.discriminator}`, true)
            .setTimestamp()
            .setColor(2067276)
        logchannel.send(logembed);

    }
};
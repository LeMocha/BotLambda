const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelDelete',
    async execute(client, channel) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_DELETE',
        });

        const { executor } = fetchedLogs.entries.first();

        const logembed = new MessageEmbed()
            .setTitle(`🚧 Un salon a été supprimé !`)
            .addField('⚙️ Type de salon :', `${channel.type}`, true)
            .addField('🗃️ Catégorie :', `${channel.parent}`, true)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nSalon = ${channel.id}\nCategorie = ${channel.parent.id}\`\`\``, false)
            .addField(':bookmark_tabs: Salon :', `${channel.name}`, true)
            .addField(':robot: Suppr. par :', `${executor.username}#${executor.discriminator}`, true)
            .setTimestamp()
            .setColor(11342935)
        logchannel.send(logembed);
    }
};
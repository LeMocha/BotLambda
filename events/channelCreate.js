const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelCreate',
    async execute(client, channel) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await channel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_CREATE',
        });

        const { executor } = fetchedLogs.entries.first();

        const logembed = new MessageEmbed()
            .setTitle(`🔧 Un salon a été créé !`)
            .addField('⚙️ Type de salon :', `${channel.type}`, true)
            .addField('🗃️ Catégorie :', `${channel.parent}`, true)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nChannel = ${channel.id}\nParent = ${channel.parent.id}\`\`\``, false)
            .addField(':bookmark_tabs: Salon :', `${channel.name}`, true)
            .addField(':robot: Suppr. par :', `${executor.username}#${executor.discriminator}`, true)
            .setTimestamp()
            .setColor(8359053)
        logchannel.send(logembed);
    }
};
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildBanRemove',
    async execute(client, guild, user) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE',
        });

        const { executor } = fetchedLogs.entries.first();

        const logembed = new MessageEmbed()
            .setTitle(`🚧 Un membre a été débanni !`)
            .addField('⚙️ Modérateur :', `${executor.tag}`, true)
            .addField('🗃️ Membre Débanni :', `${user.tag}`, true)
            .addField(':label: ID :', `\`\`\`ini\nModerateur = ${executor.id}\nMembreDeBanni = ${user.id}\`\`\``, false)
            .setTimestamp()
            .setColor(11342935)
        logchannel.send(logembed);
    }
};
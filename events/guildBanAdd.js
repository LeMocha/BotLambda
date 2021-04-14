const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildBanAdd',
    async execute(client, guild, user) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });

        const { executor, reason } = fetchedLogs.entries.first();

        const logembed = new MessageEmbed()
            .setTitle(`🚧 Un membre a été banni !`)
            .addField('⚙️ Modérateur :', `${executor.tag}`, true)
            .addField('🗃️ Membre Banni :', `${user.tag}`, true)
            .addField(':label: ID :', `\`\`\`ini\nModerateur = ${executor.id}\nMembreBanni = ${user.id}\`\`\``, false)
            .addField(':bookmark_tabs: Raison :', `${reason}`, false)
            .setTimestamp()
            .setColor(11342935)
        logchannel.send(logembed);
    }
};
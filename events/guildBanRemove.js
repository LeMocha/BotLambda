const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildBanRemove',
    async execute(client, guild, user) {
        
        if(guild.id !== "658437922256584725") return;

        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE',
        });

        const { executor, createdTimestamp } = fetchedLogs.entries.first();

        var now = new Date().getTime()
        if (now-createdTimestamp>2) return;

        if (executor.id == client.user.id) return;

        const logembed = new MessageEmbed()
            .setTitle(`<:ban:847195607089283132> Un membre a été débanni !`)
            .addField('<:moderation:847186161582735400> Modérateur :', `${executor.tag}`, true)
            .addField('<:utilisateur:847181191530151993> Membre Débanni :', `${user.tag}`, true)
            .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nModerateur = ${executor.id}\nMembreDeBanni = ${user.id}\`\`\``, false)
            .setTimestamp()
            .setColor(11342935)
        logchannel.send(logembed);
    }
};
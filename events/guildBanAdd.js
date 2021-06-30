const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildBanAdd',
    async execute(client, guild, user) {

        if(guild.id !== "658437922256584725") return;

        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });

        const { executor, reason, createdTimestamp } = fetchedLogs.entries.first();

        var now = new Date().getTime()
        if (now-createdTimestamp>2) return;

        if (executor.id == client.user.id) return;

        const logembed = new MessageEmbed()
            .setTitle(`<:ban:847195607089283132> Un membre a été banni !`)
            .addField('<:moderation:847186161582735400> Modérateur :', `${executor.tag}`, true)
            .addField('<:utilisateur:847181191530151993> Membre Banni :', `${user.tag}`, true)
            .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nModerateur = ${executor.id}\nMembreBanni = ${user.id}\`\`\``, false)
            .addField('<:type:847195608736727060> Raison :', `${reason}`, false)
            .setTimestamp()
            .setColor(11342935)
        logchannel.send(logembed);
    }
};
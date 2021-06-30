const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildMemberUpdate',
    async execute(client) {

        var now = new Date().getTime()

        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_UPDATE',
        });

        const { executor, changes, target, createdTimestamp } = fetchedLogs.entries.first();

        newuser = changes[0]

        if (newuser.key != "nick") return;
        if (now-createdTimestamp>1000) return;

        const logembed = new MessageEmbed()
            .setTitle(`<:modifieruser:847181191236026398> Changement de pseudo !`)
            .addField('<:bot:847186160483565628> Ancien Pseudo :', `${newuser.old}`, true)
            .addField('<:utilisateur:847181191530151993> Nouveau Pseudo :', `${newuser.new}`, true)
            .setFooter("Attention ! \"undefined\" dans les cases pseudo ne signifie pas une erreur mais que l'utilisateur n'avait pas de précédent pseudo ou n'en a plus.")
            .setTimestamp()
            .setColor("#1FDE80")
        if(executor == target.id){
            logembed.setDescription(`${executor.tag} a changé son pseudo.`)
        } else {
            logembed.setDescription(`${executor.tag} a changé le pseudo de ${target.tag}`)
        }
        
        logchannel.send(logembed);
    }
};
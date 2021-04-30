const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'guildMemberUpdate',
    async execute(client) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_UPDATE',
        });

        console.log(fetchedLogs.entries.first())

        const { executor, changes, target } = fetchedLogs.entries.first();

        newuser = changes[0]

        if(newuser.key !== "nick"){
            return
        }

        const logembed = new MessageEmbed()
            .setTitle(`🔧 Changement de pseudo !`)
            .addField(':bookmark_tabs: Ancien Pseudo :', `${newuser.old}`, true)
            .addField(':robot: Nouveau Pseudo :', `${newuser.new}`, true)
            .setFooter("Attention ! \"undefined\" dans les cases pseudo ne signifie pas une erreur mais que l'utilisateur n'avait pas de précédent pseudo ou n'en a plus.")
            .setTimestamp()
            .setColor(8359053)
        if(executor == target.id){
            logembed.setDescription(`${executor.tag} a changé son pseudo.`)
        } else {
            logembed.setDescription(`${executor.tag} a changé le pseudo de ${target.tag}`)
        }
        
        logchannel.send(logembed);
    }
};
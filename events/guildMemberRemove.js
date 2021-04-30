const Discord = require('discord.js');
const chalk = require('chalk');
module.exports = {
    name: 'guildMemberRemove',
    execute(client, member) {
        const channel = client.channels.cache.get('659528441967804416');
        const nbedegens = channel.guild.memberCount;
        const nbedebots = channel.guild.roles.cache.get('658442658737291334').members.size;
        let total = nbedegens - nbedebots
        if (!channel) return;
        const chanamodif = client.channels.cache.get('775754356673740873');
        const byechannel = client.channels.cache.get('658438198996893768');
        chanamodif.setName("👤 Membres : " + total)
        console.log(`[INFO] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.green(`${member.user.username} vient de quitter le serveur.`));
        if(member.id === "690831638623420438"){
            return
        }
        byechannel.send(`Aïe... Coup dur pour ${member.user.username} qui a quitté le serveur :wave::disappointed_relieved:`);
    }
};
const Discord = require('discord.js');
const chalk = require('chalk');
module.exports = {
    name: 'guildMemberAdd',
    execute(client, member) {
        console.log(`[INFO] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.green(`${member.user.username} vient de rejoindre le serveur.`));
    const channel = client.channels.cache.get('659528441967804416');
    const nbedegens = channel.guild.memberCount;
    const nbedebots = channel.guild.roles.cache.get('658442658737291334').members.size;
    let total = nbedegens - nbedebots
    if (!channel) return;
    const chanamodif = client.channels.cache.get('775754356673740873');
    chanamodif.setName("👤 Membres : " + total)
    if(member.id === "690831638623420438"){
        return
    }
    const embed = new Discord.MessageEmbed()
        .setFooter(member.client.user.username, member.client.user.avatarURL())
        .setTimestamp()
        .setTitle(`Hey ${member.user.username} ! Bienvenue sur le serveur de TechLambda :tada::hugging: ! !`)
        .setDescription(`Nous sommes désormais ${total} sur le serveur !`)
        .setImage("https://media.giphy.com/media/3o7aDcS4fAE9gHUVkk/giphy.gif")
        .setColor("00ffff");
    channel.send(embed);
    member.roles.add('658439261372284958')
    }
};
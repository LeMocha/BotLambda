const Discord = require('discord.js');

module.exports = {
    name: 'lien',
    description: 'Donne la liste de tous les liens utiles',
    args: false,
    guildOnly: false,
    usage: "",
    category: "information",
    execute(message, args) {

        const embed = new Discord.MessageEmbed()
            .setTitle("Voici la liste de tous les liens utiles :")
            .addField("<:discord:795931203538518017> Tu as besoin du lien du serveur ? Il est juste là !",`[Lien du serveur](https://discord.gg/Vqp95vj)`)
            .addField("<:tls:793638819999121469> Au fait, es-tu au courant qu'il existe un serveur dédié aux TechLambdaShow ?",`[Lien du serveur du TechLambdaShow](https://discord.gg/srDSrpQddN)`)
            .addField("<:youtube:795931203395125258> Ma chaîne YouTube :",`[TechLambda](https://www.youtube.com/techlambda)`)
            .addField("<:twitch:795931203509289010> Ma chaîne Twitch :",`[TechLambdaLIVE](https://www.twitch.tv/techlambdalive)`)
            .addField("<:twitter:795931203865542686> Mon Twitter :",`[@_TechLambda](https://twitter.com/_TechLambda)`)
            .addField("<:email:795931203928195113> Mon email :","contact.techlambda@gmail.com")
            .setColor(0x00ffff);
        message.channel.send(embed)
    }
};
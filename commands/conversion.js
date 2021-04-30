const Discord = require('discord.js');

module.exports = {
    name: 'conversion',
    description: 'Permet de convertir MEH <=> euros !',
    args: true,
    guildOnly: false,
    usage: "<somme> <monnnaie choisie>",
    category: "fun",
    execute(message, args) {
        message.delete();
        let somme = parseInt(args[0])
        if(isNaN(somme) == true){
             return message.reply(`désolé ! Mais tu as choisi un nombre qui n'est pas valide !`).then(msg => msg.delete({ timeout: 5000 }));
        }
        if(args[1] == undefined){
            return message.reply('désolé ! Mais tu ne m\'a pas dit si tu convertissait des MEH ou des euros...')
        }
        if(args[1].toLowerCase() == "euros" || args[1].toLowerCase() == "e" || args[1].toLowerCase() == "eur" || args[1].toLowerCase() == "eurs"){
            const sommefinale = somme*1.25

            const embed = new Discord.MessageEmbed()
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
                .setTitle("Convertisseur euros <=> MEH")
                .setDescription(`**Valeur en euros :** ${somme} euros\n**Valeur en MEH :** ${sommefinale} MEH`)
                .setColor("00ffff");
            message.channel.send(embed)
            return
        }
        if(args[1].toLowerCase() == "meh" || args[1].toLowerCase() == "m" || args[1].toLowerCase() == "mh" || args[1].toLowerCase() == "eh"){
            const sommefinale = somme*0.75

            const embed = new Discord.MessageEmbed()
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
                .setTitle("Convertisseur MEH <=> euros")
                .setDescription(`**Valeur en euros :** ${sommefinale} euros\n**Valeur en MEH :** ${somme} MEH`)
                .setColor("00ffff");
            message.channel.send(embed)
            return
        } else {
            return message.reply('désolé ! Mais tu ne m\'a pas dit si tu convertissait des MEH ou des euros...')
        }
    },
};
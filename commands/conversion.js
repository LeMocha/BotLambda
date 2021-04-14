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
        if(args[1].toLowerCase() == "euros" | "e" | "eur" | "eurs"){
            const sommefinale = somme*2

            const embed = new Discord.MessageEmbed()
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
                .setTitle("Convertisseur euros <=> MEH")
                .setDescription(`**Valeur en euros :** ${somme} euros\n**Valeur en MEH :** ${sommefinale} MEH`)
                .setColor("00ffff");
            message.channel.send(embed)
            return
        }
        if(args[1].toLowerCase() == "meh" | "m" | "mh" | "eh"){
            const sommefinale = somme*1.25

            const embed = new Discord.MessageEmbed()
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
                .setTitle("Convertisseur euros <=> MEH")
                .setDescription(`**Valeur en euros :** ${somme} euros\n**Valeur en MEH :** ${sommefinale} MEH`)
                .setColor("00ffff");
            message.channel.send(embed)
            return
        } else {
            return message.reply('désolé ! Mais tu ne m\'a pas dit si tu convertissait des MEH ou des euros...')
        }
    },
};
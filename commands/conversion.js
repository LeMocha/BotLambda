const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'conversion',
    description: 'Permet de convertir MEH <=> euros !',
    args: true,
    guildOnly: false,
    aliases: ['cv'],
    usage: "<somme> <monnnaie choisie>",
    category: "fun",
    execute(message, args) {

        message.delete();

        let somme = parseInt(args[0])

        const embed = new MessageEmbed()
            .setFooter(`Lancé par ${message.author.username}`, message.author.avatarURL())
            .setTimestamp()
            .setColor("00ffff");

        if(isNaN(somme) == true){
            embed.setTitle(`Le nombre choisi n'est pas valide !`)
            return message.channel.send(embed)
        }
        if(args[1] == undefined){
            embed.setTitle('Tu ne m\'a pas dit si tu convertissait des MEH ou des euros...')
            return message.channel.send(embed)
        }

        let sommefinale
        if(args[1].toLowerCase() == "euros" || args[1].toLowerCase() == "e" || args[1].toLowerCase() == "eur" || args[1].toLowerCase() == "eurs"){
            sommefinale = somme*1.25
            
            embed.setTitle("Convertisseur euros → MEH")
            .setDescription(`**Valeur en euros :** ${somme} euros\n**Valeur en MEH :** ${sommefinale} MEH`)
        }
        else if(args[1].toLowerCase() == "meh" || args[1].toLowerCase() == "m" || args[1].toLowerCase() == "mh" || args[1].toLowerCase() == "eh"){
            sommefinale = somme*0.75

            embed.setTitle("Convertisseur MEH → euros")
            .setDescription(`**Valeur en MEH :** ${somme} MEH\n**Valeur en euros :** ${sommefinale} euros`)
        } else {
            embed.setTitle('Tu ne m\'a pas dit si tu convertissait des MEH ou des euros...')
        }
        message.channel.send(embed)
    },
};
const Discord = require('discord.js');

module.exports = {
    name: 'banhammer',
    description: 'QUE LE PUISSANT MARTEAU FRAPPE !',
    args: false,
    guildOnly: false,
    usage: "",
    category: "fun",
    execute(message) {

        message.delete();
        const embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`)
            .setImage("https://media.tenor.com/images/2665cc217c77ad710916dcdea56d8c73/tenor.gif")
            .setFooter(`Commande exécutée par ${message.author.username}`, message.author.avatarURL());
        message.channel.send(embed)
    }
}


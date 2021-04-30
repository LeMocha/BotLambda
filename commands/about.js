const Discord = require('discord.js');

module.exports = {
    name: 'about',
    description: 'En savoir plus à propos du bot.',
    args: false,
    guildOnly: false,
    usage: "",
    category: "information",
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setTitle(":wave: Je suis le BotLambda !")
            .addField(":wrench: Version :", "1.2.0",false)
            .addField(":pencil: Patch Note:", "→ Système de logs\n→ Multiples optimisations secondaires\n → Gif de bienvenue changé\n → Correction de défauts de language + emoji tls changé", false)
            .addField(":sparkling_heart: Remerciements :", "Le Mocha, JIM",false)
            .setColor("00ffff");
        message.channel.send(embed)
    },
};
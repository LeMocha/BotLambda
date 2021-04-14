const Discord = require('discord.js');

module.exports = {
    name: 'about',
    description: 'En savoir plus a propos du bot.',
    args: false,
    guildOnly: false,
    usage: "",
    category: "information",
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setTitle(":wave: Je suis le BotLambda !")
            .addField(":wrench: Version :", "1.2.0-dev",false)
            .addField(":pencil: Patch Note:", "Je suis en cours de dev !", false)
            .addField(":sparkling_heart: Remerciements :", "Le Mocha, JIM",false)
            .setColor("00ffff");
        message.channel.send(embed)
    },
};
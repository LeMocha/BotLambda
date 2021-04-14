const Discord = require('discord.js');

module.exports = {
    name: 'drama',
    description: 'UNE MENACE A ETE DETECTEE !',
    args: false,
    guildOnly: false,
    usage: "Aucun Usage",
    category: "fun",
    execute(message, args) {
        message.delete()
        const embed = new Discord.MessageEmbed()
            .setTitle("**<:croix:795931202997452850> Attention**")
            .setDescription("**Un drama a été détecté**\nContinuer cette discussion risque de mener à un énième TechLambdrama")
            .setColor(0xFF0000);
        message.channel.send(embed)
    },
};
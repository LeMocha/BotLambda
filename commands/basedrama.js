const Discord = require('discord.js');

module.exports = {
    name: 'basedrama',
    description: 'LA BASE VIRALE ~~VPS~~ DRAMA A ETE MISE A JOUR !',
    args: false,
    guildOnly: false,
    usage: "Aucun Usage",
    category: "fun",
    execute(message, args) {
        message.delete()
        const embed = new Discord.MessageEmbed()
            .setTitle("**<:valide:795931203198386187> Information**")
            .setDescription("**La base drama a été mise à jour**\nVous pouvez continuer cette discussion en toute tranquilité")
            .setColor(0x6EFF33);
        message.channel.send(embed)
    },
};
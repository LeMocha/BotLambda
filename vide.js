const Discord = require('discord.js');

module.exports = {
    name: '',
    description: '',
    args: false,
    guildOnly: false,
    usage: "",
    category: "information",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setTitle("")
            .addField("", "",false)
            .addField("", "", false)
            .setColor("00ffff");
        message.channel.send(embed)
    },
};
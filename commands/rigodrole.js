const Discord = require("discord.js");

module.exports = {
    name: "rigodrole",
    description: 'Un petit gif pour amuser la galerie.',
    args: false,
    guildOnly: false,
    aliases:['rgd'],
    usage: "",
    category: "fun",
    execute(message) {
            message.delete();
            const attachment = new Discord.MessageAttachment('./images/rigodrole.jpg');
            const embed = new Discord.MessageEmbed()
                .setColor("00ffff")
                .attachFiles(attachment)
                .setImage(`attachment://rigodrole.jpg`)
                .setFooter(`Lancé par ${message.author.username}`, message.author.avatarURL());
            message.channel.send(embed)
    },
};

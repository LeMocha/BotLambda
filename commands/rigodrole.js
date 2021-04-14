const Discord = require("discord.js");

module.exports = {
    name: "rigodrole",
    description: 'Un petit gif pour amuser la galerie.',
    args: false,
    guildOnly: false,
    usage: "",
    category: "fun",
    execute(message) {
            message.delete();
            const attachment = new Discord.MessageAttachment('./ressources/rigodrole.jpg');
            const embed = new Discord.MessageEmbed()
                .setColor(`RANDOM`)
                .attachFiles(attachment)
                .setImage(`attachment://rigodrole.jpg`)
                .setFooter(`Commande de : ${message.author.username}`, message.author.avatarURL());
            message.channel.send(embed)
    },
};

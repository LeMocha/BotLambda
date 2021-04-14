const Discord = require("discord.js");

module.exports = {
    name: "bescherelle",
    description: 'ATTAQUE BESCHERELLE !',
    args: false,
    guildOnly: false,
    usage: "",
    category: "fun",
    execute(message) {
            message.delete();
            const attachment = new Discord.MessageAttachment('./ressources/Attaque_Bescherelle.jpg');
            const embed = new Discord.MessageEmbed()
                .setTitle("**J'ai mal à mon Slawk...**")
                .setColor(`RANDOM`)
                .attachFiles(attachment)
                .setImage(`attachment://Attaque_Bescherelle.jpg`)
                .setFooter(`Commande de : ${message.author.username}`, message.author.avatarURL());
            message.channel.send(embed)
    },
};

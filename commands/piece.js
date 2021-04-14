const Discord = require('discord.js');

module.exports = {
    name: 'piece',
    description: 'Une réponse simple a toutes vos questions',
    args: false,
    guildOnly: false,
    usage: "<votre question>",
    category: "fun",
    execute(message) {
        rep = Math.random()

        if(rep >= 0.5){
            const attachment = new Discord.MessageAttachment('./ressources/piece/pile.png');
            const embed = new Discord.MessageEmbed()
                .setColor(`F8C300`)
                .setTitle('Pile !')
                .attachFiles(attachment)
                .setImage(`attachment://pile.png`)
                .setFooter(`Commande de : ${message.author.username}`, message.author.avatarURL());
            message.channel.send(embed)
        }
        else{
            const attachment = new Discord.MessageAttachment('./ressources/piece/face.png');
            const embed = new Discord.MessageEmbed()
                .setColor(`F8C300`)
                .setTitle('Face !')
                .attachFiles(attachment)
                .setImage(`attachment://face.png`)
                .setFooter(`Commande de : ${message.author.username}`, message.author.avatarURL());
            message.channel.send(embed)
        }
    },
};
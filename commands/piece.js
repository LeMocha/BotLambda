const Discord = require('discord.js');

module.exports = {
    name: 'piece',
    description: 'Une réponse simple a toutes vos questions',
    args: false,
    guildOnly: false,
    aliases:['pc'],
    usage: "",
    category: "fun",
    execute(message) {
        message.delete()
        
        rep = Math.random()

        const embed = new Discord.MessageEmbed()
            .setColor("00ffff")
            .setFooter(`Lancé par ${message.author.username}`, message.author.avatarURL());

        if(rep >= 0.5){
            const attachment = new Discord.MessageAttachment('./images/piece/pile.png');
            embed.setTitle('Pile !')
                .attachFiles(attachment)
                .setImage(`attachment://pile.png`)
        }
        else{
            const attachment = new Discord.MessageAttachment('./images/piece/face.png');
            embed.setTitle('Face !')
                .attachFiles(attachment)
                .setImage(`attachment://face.png`)
        }
        message.channel.send(embed)
    },
};
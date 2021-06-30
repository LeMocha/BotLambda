const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'banhammer',
    description: 'QUE LE PUISSANT MARTEAU FRAPPE !',
    args: false,
    guildOnly: false,
    aliases: ['bh'],
    usage: "",
    category: "fun",
    execute(message) {

        message.delete();

        message.channel.send({embed: {
            color: "00ffff",
            title: "Mocha's Banhammer joined the game !",
            timestamp: new Date(),
            footer: {
                text: `Lancé par ${message.author.username}`,
                icon_url: message.client.user.avatarURL(),
            },
            image: {
                url: 'https://media.tenor.com/images/2665cc217c77ad710916dcdea56d8c73/tenor.gif',
            },
        }})
    }
}


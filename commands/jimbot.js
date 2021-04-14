const Discord = require('discord.js');

module.exports = {
    name: 'jimbot',
    description: 'LE PIRE CONCURENT EVER MDRRR',
    args: false,
    guildOnly: false,
    usage: "Aucun Usage",
    category: "fun",
    execute(message, args) {
        message.delete()
        message.channel.send("J'vais te casser la tronche sur l'octogone <@593759261503258634> !");
    },
};
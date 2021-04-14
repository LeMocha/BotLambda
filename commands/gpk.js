const Discord = require('discord.js');

module.exports = {
    name: 'gpk',
    description: 'Kev Adams come back !',
    args: false,
    guildOnly: false,
    usage: "Aucun Usage",
    category: "fun",
    execute(message, args) {
        message.delete()
        message.channel.send("Gepakompris, c'est comme un abonné Free, il a tout compris !");
    },
};
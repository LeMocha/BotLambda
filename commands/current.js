const Discord = require('discord.js');

module.exports = {
    name: 'current',
    description: 'Permet de savoir le nom de la musique actuelle',
    args: false,
    guildOnly: true,
    usage: "",
    category: "musique",
    execute(message, args) {
        const { queue } = message.client;
        const serverQueue = queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("La file d'attente est vide !").then(msg => msg.delete({timeout:5000}));
        const song = serverQueue.songs[0];
        const embed = new Discord.MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setTitle(`Information sur la musique actuelle :`)
            .setColor("00ffff")
            .addField("Nom : ", song.title)
            .addField("URL : ",song.url);
        message.channel.send(embed);
    },
};
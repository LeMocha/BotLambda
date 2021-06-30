const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'current',
    description: 'Permet de savoir le nom de la musique actuelle',
    args: false,
    guildOnly: true,
    aliases:['c'],
    usage: "",
    category: "musique",
    execute(message) {
        message.delete();

        const { queue } = message.client;
        const serverQueue = queue.get(message.guild.id);

        const embed = new MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setColor("00ffff")
            .setFooter(`Lancé par ${message.author.username}`, message.author.avatarURL());

        if(!serverQueue){
            embed.setTitle('La fille d\'attente est vide !')
            return message.channel.send(embed).then(msg => msg.delete({timeout:5000}));
        }

        const song = serverQueue.songs[0];
        
        embed.setTitle(`<:shazam:847963203329851424> Information sur la musique actuelle :`)
        .addField("Nom : ", song.title)
        .addField("Chaîne YT :", song.vidchan, true)
        .addField("URL : ",`[Cliquez-ici !](${song.url})`)

        message.channel.send(embed);
    },
};
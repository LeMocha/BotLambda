const Discord = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Permet d\'avoir la liste des musiques en file d\'attente',
    args: false,
    guildOnly: true,
    usage: "",
    category: "musique",
    execute(message) {
        const { queue } = message.client;
        const serverQueue = queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("La file d'attente est vide !").then(msg => msg.delete({timeout:5000}));
        const embed = new Discord.MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setTitle(`La liste de toute les musiques en file d'attente`)
            .setColor("00ffff");

        let songs = "";
        let i = 0;
        serverQueue.songs.forEach(song => {
            if(i === 0){
                songs += `**Lecture en cours : **${song.title}\n\n`;
                i++
            } else{
                songs += `${i}- ${song.title}\n*Ajoutée Par :*  \`\`${song.addby}\`\`\n`
                i++
            }
        });
        embed.setDescription(songs);
        message.channel.send(embed);
    },
};
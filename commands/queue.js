const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    description: 'Permet d\'avoir la liste des musiques en file d\'attente',
    args: false,
    guildOnly: true,
    aliases: ['q'],
    usage: "",
    category: "musique",
    execute(message) {
        message.delete()
        
        const { queue } = message.client;
        const serverQueue = queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send({
            embed : {
                type: "rich",
                color: 16763981,
                description: "**:warning: La fille d'attente est vide !**",
                timestamp: new Date(),
            }}).then(msg => msg.delete({timeout:5000}));

        const embed = new MessageEmbed()
            .setTimestamp()
            .setTitle(`<:playlist:847181191089618985> La liste de toute les musiques en file d'attente`)
            .setColor("00ffff")
            .setFooter(`Lancé par ${message.author.username}`, message.author.avatarURL());

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
        if(i === 1){
            songs += `Aucun titre en file d'attente.`
        }
        embed.setDescription(songs);
        message.channel.send(embed);
    },
};
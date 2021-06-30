module.exports = {
    name: 'qreset',
    description: 'Permet de supprimer toute la file d\'attente sauf la musique en cours',
    args: false,
    guildOnly: true,
    aliases: ['qr'],
    usage: "",
    category: "musique",
    execute(message) {

        message.delete()

        if (!message.member.voice.channel) {
            return message.channel.send({
                embed : {
                    type: "rich",
                    color: 16763981,
                    description: "**:warning: Tu dois être dans un channel vocal pour effacer la playlist !**",
                    timestamp: new Date(),
                }
            }).then(msg => msg.delete({timeout:5000}));
        }
        
        const serverQueue = message.client.queue.get(message.guild.id)

        if(!serverQueue) return message.channel.send({
            embed:{
                type: "rich",
                color: 16763981,
                description: "**:warning: La fille d'attente est vide !**",
                timestamp: new Date(),
            }
        }).then(msg => msg.delete({timeout:5000}));
        
        serverQueue.songs.splice(1);

        message.channel.send({
            embed: {
                color: "00ffff",
                description: "**<:gestplaylist:847181190057558037> La file d'attente a bien été effacée !**",
                timestamp: new Date(),
                footer: {
                    text: `Lancé par ${message.author.username}`,
                    icon_url: message.client.user.avatarURL(),
                },
            }
        });
    },
};
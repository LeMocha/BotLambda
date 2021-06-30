module.exports = {
    name: 'qdel',
    description: 'Permet de supprimer une musique de la file d\'attente',
    args: true,
    guildOnly: true,
    aliases: ['qd'],
    usage: "",
    category: "musique",
    execute(message, args) {

        message.delete()

        if (!message.member.voice.channel) {
            return message.channel.send({
                embed : {
                    type: "rich",
                    color: 16763981,
                    description: "**:warning: Tu dois être dans un channel vocal pour effacer une musique !**",
                    timestamp: new Date(),
                }
            }).then(msg => msg.delete({timeout:5000}));
        }

        const serverQueue = message.client.queue.get(message.guild.id)

        if(!serverQueue) return message.channel.send({
            embed:{
                type: "rich",
                color: 16763981,
                description: "**:warning: La file d'attente est vide !**",
                timestamp: new Date(),
            }
        }).then(msg => msg.delete({timeout:5000}));

        if (args <= 0 || args > serverQueue.songs.length){
            message.channel.send({
                embed: {
                    type: "rich",
                    color: 16763981,
                    description: "**:warning: Le nombre entré est invalide !**",
                    timestamp: new Date(),
                }
            })
        }

        let song = serverQueue.songs[`${args}`].title

        serverQueue.songs.splice(`${args}`,1)

        message.channel.send({
            embed: {
                type: "rich",
                color: "00ffff",
                description: `**<:gestplaylist:847181190057558037> "${song}" Retiré de la file d'attente !**`,
                timestamp: new Date(),
                footer: {
                    text: `Lancé par ${message.author.username}`,
                    icon_url: message.client.user.avatarURL(),
                }
            }
        });
    },
};
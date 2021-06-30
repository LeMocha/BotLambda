const { yellow } = require("chalk");
const { logTime } = require("../utils/utils");


module.exports = {
    name: 'stop',
    description: 'Permet de stopper la musique et de vider la file d\'attente',
    args: false,
    guildOnly: true,
    aliases: ['sp'],
    usage: "",
    category: "musique",
    execute(message) {
        message.delete()
        stop(message, message.client.queue.get(message.guild.id), message.client.queue)
    },

};
function stop(message, serverQueue, queue) {
    if (!message.member.voice.channel) {
        console.log(`[WARN} [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu stopper la musique, il n'était pas connecté à un salon vocal.`));
        return message.channel.send({
            embed : {
                type: "rich",
                color: 16763981,
                description: "**:warning: Tu dois être dans un channel vocal pour stopper la musique !**",
                timestamp: new Date(),
            }
        }).then(msg => msg.delete({timeout:5000}));
    }
    if (!serverQueue) {
        console.log(`[WARN} [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu stopper la musique, il n'y a pas de musique en cours.`));
        return message.channel.send({
            embed : {
                type: "rich",
                color: 16763981,
                description: "**:warning: Il y a aucune musique que je puisse stopper !**",
                timestamp: new Date(),
            }
        }).then(msg => msg.delete({timeout:5000}));
    }
    if(serverQueue.connection.dispatcher === null){
        serverQueue.voiceChannel.leave();
        queue.delete(message.guild.id);
        return;
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.pause();

}
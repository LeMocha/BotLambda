const chalk = require('chalk');

let instant = (new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds();

module.exports = {
    name: 'stop',
    description: 'Permet de stopper la musique et de vider la file d\'attente',
    args: false,
    guildOnly: true,
    usage: "",
    category: "musique",
    execute(message) {
        stop(message, message.client.queue.get(message.guild.id), message.client.queue)
    },

};
function stop(message, serverQueue, queue) {
    if (!message.member.voice.channel) {
        console.log(`[WARN} [${instant}]`, chalk.yellow(`${message.author.tag} n'a pas pu stopper la musique, il n'était pas connecté à un salon vocal.`));
        return message.channel.send('Tu dois être dans un channel vocal pour arrêter la musique !').then(msg => msg.delete({timeout:5000}));
    }
    if (!serverQueue) {
        console.log(`[WARN} [${instant}]`, chalk.yellow(`${message.author.tag} n'a pas pu stopper la musique, il n'y a pas de musique en cours.`));
        return message.channel.send('Il y a aucune musique que je puisse stopper !').then(msg => msg.delete({timeout:5000}));
    }
    if(serverQueue.connection.dispatcher === null){
        serverQueue.voiceChannel.leave();
        queue.delete(message.guild.id);
        return;
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.pause();

}
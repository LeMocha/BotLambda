const chalk = require('chalk');

const instant = (new Date()).getHours()+":"+(new Date()).getMinutes()+":"+(new Date()).getSeconds();

module.exports = {
    name: 'skip',
    description: 'Permet de passer à la musique suivante',
    args: false,
    guildOnly: true,
    usage: "",
    category: "musique",
    execute(message) {
        skip(message, message.client.queue.get(message.guild.id), message.client.queue)
    },
};

function skip(message, serverQueue, queue) {
    if (!message.member.voice.channel) {
        console.log(`[WARN] [${instant}]`, chalk.yellow(`${message.author.tag} n'a pas pu changer de musique, il n'était pas connecté à un salon vocal.`));
        return message.channel.send('Tu dois être dans un channel vocal pour passer à la musique suivante!').then(msg => msg.delete({timeout:5000}));
    }
    if (!serverQueue) {
        console.log(`[WARN} [${instant}]`, chalk.yellow(`${message.author.tag} n'a pas pu changer de musique, il n'y a pas de musique à changer.`));
        return message.channel.send('Il y a aucune musique que je puisse passer !').then(msg => msg.delete({timeout:5000}));
    }
    if(serverQueue.connection.dispatcher === null){
        serverQueue.voiceChannel.leave();
        queue.delete(message.guild.id);
        return;
    }
    serverQueue.connection.dispatcher.pause();

}


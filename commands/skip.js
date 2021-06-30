const { yellow } = require("chalk");
const { logTime } = require("../utils/utils");

module.exports = {
    name: 'skip',
    description: 'Permet de passer à la musique suivante',
    args: false,
    guildOnly: true,
    aliases: ['sk'],
    usage: "",
    category: "musique",
    execute(message) {
        message.delete()
        skip(message, message.client.queue.get(message.guild.id), message.client.queue)
    },
};

function skip(message, serverQueue, queue) {
    if (!message.member.voice.channel) {
        console.log(`[WARN] [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu changer de musique, il n'était pas connecté à un salon vocal.`));
        return message.channel.send({
            embed: {
                type: "rich",
                color: 16763981,
                description: "**:warning: Tu dois être dans un channel vocal pour passer à la musique suivante !**",
                timestamp: new Date(),
            }
        }).then(msg => msg.delete({timeout:5000}));
    }
    if (!serverQueue) {
        console.log(`[WARN} [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu changer de musique, il n'y a pas de musique à changer.`));
        return message.channel.send({
            embed: {
                type: "rich",
                color: 16763981,
                description: "**:warning: Il y a aucune musique que je puisse passer !**",
                timestamp: new Date(),
            }
        }).then(msg => msg.delete({timeout:5000}));
    }
    if(serverQueue.connection.dispatcher === null){
        serverQueue.voiceChannel.leave();
        queue.delete(message.guild.id);
        return;
    }
    serverQueue.connection.dispatcher.pause();

}


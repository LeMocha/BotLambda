const { yellow, cyan, red } = require("chalk");
const { logTime } = require("../utils/utils");

module.exports = {
    name: 'tclose',
    description: 'Permet de fermer un ticket',
    args: false,
    guildOnly: true,
    aliases: ['tc'],
    category: "ticket",
    usage: "",
    
    async execute(message) {

        const chan = message.channel;
        if(!chan.name.startsWith("ticket-")) {
            console.log(`[WARN] [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu fermer le ticket ${chan.name}, ce salon n'est pas un ticket.`));
            return message.channel.send("Ce salon n'est pas un ticket, je ne peux pas le fermer !").then(msg => msg.delete({timeout:5000}));
        }
        if(!chan.deletable) {
            console.log(`[WARN] [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu fermer le salon ${chan.name}, je n'ai pas les permissions suffisantes.`));
            return message.channel.send("Je ne peux pas fermer ce ticket ! Merci de vérifier mes permissions.").then(msg => msg.delete({timeout:5000}));
        }
        console.log(`[INFO] [${logTime()}]`, cyan(`${message.author.tag} à fermé le ticket ${chan.name}`));
        await chan.delete("Fermeture du ticket !")
            .then(channel => {
                message.author.send({embed: {
                    color: "00ffff",
                    description: `Tu as fermé le ticket **${channel.name}** !`,
                    timestamp: new Date(),
                    footer: {
                        text: `Lancé par ${message.author.username}`,
                        icon_url: message.client.user.avatarURL(),
                    },
                }}).catch( () => {
                    console.log(`[ERROR] [${logTime()}]`, red(`Impossible de prévenir ${message.author.tag} qu'il a fermé le ticket ${channel.name}`));
                });
            });
    },
};
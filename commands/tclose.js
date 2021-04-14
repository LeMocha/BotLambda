const { yellow, cyan, red } = require("chalk");
const { MessageEmbed } = require("discord.js");

const instant = (new Date()).getHours()+":"+(new Date()).getMinutes()+":"+(new Date()).getSeconds();


module.exports = {
    name: 'tclose',
    description: 'Permet de fermer un ticket',
    args: false,
    guildOnly: true,
    category: "ticket",
    usage: "",
    
    async execute(message) {
        const chan = message.channel;
        if(!chan.name.startsWith("ticket-")) {
            console.log(`[WARN] [${instant}]`, yellow(`${message.author.tag} n'a pas pu fermer le ticket ${chan.name}, ce salon n'est pas un ticket.`));
            return message.channel.send("Ce salon n'est pas un ticket, je ne peux pas le fermer !").then(msg => msg.delete({timeout:5000}));
        }
        if(!chan.deletable) {
            console.log(`[WARN] [${instant}]`, yellow(`${message.author.tag} n'a pas pu fermer le salon ${chan.name}, je n'ai pas les permissions suffisantes.`));
            return message.channel.send("Je ne peux pas fermer ce ticket ! Merci de vérifier mes permissions.").then(msg => msg.delete({timeout:5000}));
        }
        console.log(`[INFO] [${instant}]`, cyan(`${message.author.tag} à fermé le ticket ${chan.name}`));
        await chan.delete("Fermeture du ticket !")
            .then(channel => {
                const embed = new MessageEmbed()
                    .setFooter(message.client.user.username, message.client.user.avatarURL())
                    .setTimestamp()
                    .setDescription(`Tu as fermé le ticket **${channel.name}** !`)
                    .setColor("00ffff");
                message.author.send(embed).catch( () => {
                    console.log(`[ERROR] [${instant}]`, red(`Impossible de prévenir ${message.author.tag} qu'il a fermé le ticket ${channel.name}`));
                });
            });
    },
};
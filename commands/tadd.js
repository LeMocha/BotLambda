const { cyan } = require('chalk');
const mentions = require('../utils/mentions.js');

const time = (new Date()).getHours()+":"+(new Date()).getMinutes()+":"+(new Date()).getSeconds();

module.exports = {
    name: 'tadd',
    description: 'Permet d\'ajouter quelqu\'un à un ticket',
    args: true,
    guildOnly: true,
    category: "ticket",
    usage: "<user> <salon>",
    execute(message, args) {
        if(args.length < 2) return message.channel.send("Merci de mentionner un ticket valide !").then(msg => msg.delete({ timeout:5000}));
        const user = mentions.getUserFromMention(message.client, args[0]) || mentions.getUserFromMention(message.client, args[1]);
        const chan = mentions.getChannelFromMention(message.client, args[1]) || mentions.getChannelFromMention(message.client, args[0]);
        if(user === null) return message.channel.send("Merci de mentionner un utilisateur !").then(msg => msg.delete({ timeout:5000}));
        if(chan === null || !chan.name.startsWith('ticket-')) return message.channel.send("Merci de mentionner un ticket valide !").then(msg => msg.delete({ timeout:5000}));
        chan.updateOverwrite(user.id, {
            VIEW_CHANNEL: true
        })
            .then(chan => {
                console.log(`[INFO] [${time}]`, cyan(`${message.author.tag} a ajouté ${user.username} au ticket ${chan} !`));
                message.channel.send(`Tu as bien ajouté ${user} à ${chan} !`).then(msg => msg.delete({timeout:5000}));
            })
            .catch( () => {
            console.log(`[INFO] [${time}]`, cyan(`${message.author.tag} n'a pas réussi a ajouté ${user.username} au ticket ${chan} !`));
            message.channel.send(`Impossible d'ajouter ${user.tag}`);
        });
    },
};
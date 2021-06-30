const { cyan } = require('chalk');
const mentions = require('../utils/mentions.js');
const { logTime } = require('../utils/utils.js');

module.exports = {
    name: 'tadd',
    description: 'Permet d\'ajouter quelqu\'un à un ticket',
    args: true,
    guildOnly: true,
    aliases: ['ta'],
    category: "ticket",
    usage: "<user> <salon>",
    execute(message, args) {
        message.delete()

        const user = mentions.getUserFromMention(message.client, args[0]) || mentions.getUserFromMention(message.client, args[1]);
        const chan = mentions.getChannelFromMention(message.client, args[1]) || mentions.getChannelFromMention(message.client, args[0]);
        if(user === null) return message.channel.send("Merci de mentionner un utilisateur !").then(msg => msg.delete({ timeout:5000}));
        if(message.channel.name.startsWith('ticket-')) {
            chan = message.channel
        } else {
            if(chan === null || !chan.name.startsWith('ticket-')) return message.channel.send("Merci de mentionner un ticket valide !").then(msg => msg.delete({ timeout:5000}));
        }
        chan.updateOverwrite(user.id, {
            VIEW_CHANNEL: true
        })
            .then(chan => {
                console.log(`[INFO] [${logTime()}]`, cyan(`${message.author.tag} a ajouté ${user.username} au ticket ${chan} !`));
                message.channel.send(`Tu as bien ajouté ${user} à ${chan} !`).then(msg => msg.delete({timeout:5000}));
            })
            .catch( () => {
            console.log(`[INFO] [${logTime()}]`, cyan(`${message.author.tag} n'a pas réussi à ajouté ${user.username} au ticket ${chan} !`));
            message.channel.send(`Impossible d'ajouter ${user.tag}`);
        });
    },
};
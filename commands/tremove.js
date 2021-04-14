const mentions = require('../utils/mentions.js');

module.exports = {
    name: 'tremove',
    description: 'Permet de retirer quelqu\'un d\'un ticket',
    args: true,
    guildOnly: true,
    category: "ticket",
    usage: "<user> <salon>",
    execute(message, args) {
        console.log(`Commande "!tremove" exécutée par ${message.author.tag} !`);
        if(args.length < 2) return message.channel.send("Merci de mentionner un ticket valide !").then(msg => msg.delete({ timeout:5000}));
        const user = mentions.getUserFromMention(message.client, args[0]);
        const chan = mentions.getChannelFromMention(message.client, args[1]);
        if(user === null) return message.channel.send("Merci de mentionner un utilisateur !").then(msg => msg.delete({ timeout:5000}));
        if(chan === null || !chan.name.startsWith('ticket-')) return message.channel.send("Merci de mentionner un ticket valide !").then(msg => msg.delete({ timeout:5000}));
        chan.updateOverwrite(user.id, {
            VIEW_CHANNEL: false
        })
            .then(chan => {
                message.channel.send(`Tu as bien retiré ${user} à ${chan} !`).then(msg => msg.delete({timeout:5000}));
            })
            .catch( () => {
                message.channel.send(`Impossible d'ajouter ${user.tag}`);
            });
    },
};


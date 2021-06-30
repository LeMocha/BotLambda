const { getUserFromMentionWithMessages } = require('../utils/mentions.js');
const mentions = require('../utils/mentions.js');

module.exports = {
    name: 'tremove',
    description: 'Permet de retirer quelqu\'un d\'un ticket',
    args: true,
    guildOnly: true,
    aliases: ['tr'],
    category: "ticket",
    usage: "<user> <salon>",
    execute(message, args, client) {
        message.delete()

        const user = getUserFromMentionWithMessages(message, args[0]);
        let chan = mentions.getChannelFromMention(message.client, args[1]);
        if(user === null) return message.reply("Merci de mentionner un utilisateur !")
        if(user.hasPermission('MANAGE_MESSAGES')){
            return message.reply("Tu ne peux pas exclure un modérateur du ticket !")
        }
        if(message.channel.name.startsWith('ticket-')) {chan = message.channel}
        if(chan === null) return message.reply("Merci de mentionner un ticket valide !")
        chan.updateOverwrite(user.id, {
            VIEW_CHANNEL: false
        })
        .then(chan => {
            message.reply(`Tu as bien retiré ${user} à ${chan} !`)
        })
        .catch( () => {
            message.reply(`Impossible d'ajouter ${user.tag} !`);
        });
    },
};


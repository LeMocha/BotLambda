const Discord = require('discord.js');

module.exports = {
    name: '🖕',
    execute(reaction, user) {
        reaction.message.reactions.resolve("🖕").users.remove(user.id);
        reaction.message.channel.send(`<@${user.id}> C'est pas bien d'être méchant sinon Oncle Ban arrivera bien vite !`).then(msg => msg.delete({ timeout: 5000 }))
    },
};
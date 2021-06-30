module.exports = {
    name: 'messageReactionAdd',
    async execute(client, reaction, user) {
        if (reaction.emoji.name == "🖕"){
            reaction.message.reactions.resolve("🖕").users.remove(user.id);
            reaction.message.channel.send(`<@${user.id}> C'est pas bien d'être méchant sinon Oncle Ban arrivera bien vite !`).then(msg => msg.delete({ timeout: 5000 }))            
        } else {
            return
        }
    }
};
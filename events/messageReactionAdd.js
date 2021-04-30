module.exports = {
    name: 'messageReactionAdd',
    async execute(client, reaction, user) {
        if (user.bot) return;

        if (!client.reactions.has(reaction.emoji.name)) return;
    
        const toreaction = client.reactions.get(reaction.emoji.name);
    
        try {
            toreaction.execute(reaction, user);
        } catch (error) { }
    }
};
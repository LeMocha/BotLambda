module.exports = {
    async execute(client, reaction, user) {
        if (user.bot) return;

        if (!client.rreactions.has(reaction.emoji.name)) return;
    
        const torreaction = client.rreactions.get(reaction.emoji.name);
    
        try {
            torreaction.execute(reaction, user);
        } catch (error) { }
    }
};
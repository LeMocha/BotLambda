const Discord = require('discord.js');

module.exports = {
    name: '💾',
    execute(reaction, user) {
        if(reaction.message.id === "725386672262348924"){
            reaction.message.guild.members.cache.get(user.id).roles.add("759792630790881291")
        }
        else {
            return
        }
    },
};
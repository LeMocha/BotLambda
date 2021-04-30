client.on("roleUpdate", function(oldRole, newRole){
    console.error(`a guild role is updated`);
});

client.on("userUpdate", function(oldUser, newUser){
    console.log(`user's details (e.g. username) are changed`);
});

client.on("channelUpdate", function(oldChannel, newChannel){
    console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`);
});

client.on("emojiUpdate", function(oldEmoji, newEmoji){
    console.log(`a custom guild emoji is updated`);
});

client.on("guildMemberUpdate", function(oldMember, newMember){
    console.error(`a guild member changes - i.e. new role, removed role, nickname.`);
});

client.on("guildUpdate", function(oldGuild, newGuild){
    console.error(`a guild is updated`);
});

//=========================================== TERMINÉ =========================================== \\

client.on("emojiCreate", function(emoji){  // Terminé
    console.log(`a custom emoji is created in a guild`);
});

client.on("emojiDelete", function(emoji){ // Terminé
    console.log(`a custom guild emoji is deleted`);
});

client.on("guildMemberAdd", function(member){ // Terminé
    console.log(`a user joins a guild: ${member.tag}`);
});

client.on("guildMemberRemove", function(member){ // Terminé
    console.log(`a member leaves a guild, or is kicked: ${member.tag}`);
});

client.on("messageReactionAdd", function(messageReaction, user){ // Terminé
    console.log(`a reaction is added to a message`);
});

client.on("messageReactionRemove", function(messageReaction, user){ // Terminé
    console.log(`a reaction is removed from a message`);
});

client.on("messageUpdate", function(oldMessage, newMessage){ // Terminé
    console.log(`a message is updated`);
});

client.on("roleCreate", function(role){ // Terminé
    console.error(`a role is created`);
});

client.on("roleDelete", function(role){ // Terminé
    console.error(`a guild role is deleted`);
});

client.on("ready", function(){ // Terminé
    console.log("user is ready !")
});

client.on("channelDelete", function(channel){ // // Terminé
    console.log(`channelDelete: ${channel}`);
});

client.on("message", function(message){ // Terminé
    console.log(`message is created -> ${message}`);
});

client.on("messageDelete", function(message){ // Terminé
    console.log(`message is deleted -> ${message}`);
});

client.on("guildBanAdd", function(guild, user){ // Terminé
    console.log(`a member is banned from a guild`);
});

client.on("guildBanRemove", function(guild, user){ // Terminé
    console.log(`a member is unbanned from a guild`);
});
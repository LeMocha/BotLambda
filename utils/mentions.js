module.exports = {
    getUserFromMention : function(client, mention){
        if(!mention) return;

        if(mention.startsWith('<@') && mention.endsWith('>')){
            mention = mention.slice(2,-1);
            if(mention.startsWith('!')){
                mention = mention.slice(1);
            }
        }
        return client.users.cache.get(mention);
    },

    getUserFromMentionWithMessages : function(message, mention){
        if (!mention) return;
        
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
                return message.guild.members.cache.get(mention);
            }
        }
    },

    getChannelFromMention : function(client, mention){
        if(!mention) return;

        if(mention.startsWith('<#') && mention.endsWith('>')){
            mention = mention.slice(2,-1);

            if(mention.startsWith('!')){
                mention = mention.slice(1);
            }
            return client.channels.cache.get(mention);
        }
    },
};
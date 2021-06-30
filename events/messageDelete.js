const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageDelete',
    async execute(client, message) {

        if(message.guild.id !== "658437922256584725") return;
        
        const logchannel = client.channels.cache.get('658622224177168414');

        if (message.author == undefined) return;
        if (message.content == undefined) return;

        try{
            const logembed = new MessageEmbed()
                .setTitle(`<:messagedeleted:847181191206797333> Un message a été supprimé !`)
                .addField('<:message:847181191446528070> Contenu du message :', `${message.content}`, false)
                .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nUtilisateur = ${message.author.id}\nSalon = ${message.channel.id}\`\`\``, false)
                .addField('<:salon:847197984831438848> Salon :', `${message.channel.name}\n**=>** <#${message.channel.id}> `, true)
                .addField('<:utilisateur:847181191530151993> Auteur du message :', `${message.author.tag}`, true)
                .setTimestamp()
                .setColor("#DED51F")
            logchannel.send(logembed);
        } catch { }
    }
};
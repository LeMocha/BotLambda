const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'messageUpdate',
    async execute(client, old, message) {

        if(message.guild.id !== "658437922256584725") return;

        try {
            const logchannel = client.channels.cache.get('658622224177168414');

            let oldcontent = `${old.content}`
            let newcontent = `${message.content}`
    
            if(message.author == undefined) return;
            if(old.content == undefined) return;
     
    
            if (oldcontent.length > 1022) {
                oldcontent = old.content.substr(0,1022)
            }
            else {
                oldcontent = old.content
            }
            if (newcontent.length > 1022) {
                newcontent = message.content.substr(0,1022)
            }
            else {
                newcontent = message.content
            }

            const logembed = new MessageEmbed()
                .setTitle(`<:editedmessage:848056031459672145> Un message a été modifié !`)
                .addField('<:annule:848056756298711080> Ancien message :', `${oldcontent}`, false)
                .addField('<:confirme:848056755304923136> Nouveau message :', `${newcontent}`, false)
                .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nUtilisateur = ${message.author.id}\nChannel = ${message.channel.id}\`\`\``, false)
                .addField('<:salon:847197984831438848> Salon :', `${message.channel.name}\n**=>** <#${message.channel.id}> `, true)
                .addField('<:utilisateur:847181191530151993> Auteur du message :', `${message.author.tag}`, true)
                .addField('<:lien:847195607873093662> Message :', `[Cliquez ici !](${message.url})`, true)
                .setTimestamp()
                .setColor("#DED51F")
            logchannel.send(logembed);
        } catch {
            return
        }
    }
};
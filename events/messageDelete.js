const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'messageDelete',
    async execute(client, message) {
        const logchannel = client.channels.cache.get('658622224177168414');

        let authorid = ""
        let authortag = ""

        try{
            authorid = message.author.id
            authortag = message.author.tag
        } catch {
            authorid = "Inconnu"
            authortag = "Inconnu"
        }

        const logembed = new MessageEmbed()
            .setTitle(`:wastebasket: Un message a été supprimé !`)
            .addField(':speech_left: Contenu du message :', `${message.content}`, false)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${authorid}\nChannel = ${message.channel.id}\`\`\``, false)
            .addField(':bookmark_tabs: Salon :', `${message.channel.name}\n**=>** <#${message.channel.id}> `, true)
            .addField(':robot: Auteur du message :', `${authortag}`, true)
            .setTimestamp()
            .setColor(3426654)
        logchannel.send(logembed);
    }
};
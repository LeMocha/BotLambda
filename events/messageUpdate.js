const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'messageUpdate',
    async execute(client, old, message) {
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
            .setTitle(`📝 Un message a été modifié !`)
            .addField('📥 Ancien message :', `${old.content}`, false)
            .addField('📤 Nouveau message :', `${message.content}`, false)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${authorid}\nChannel = ${message.channel.id}\`\`\``, false)
            .addField(':bookmark_tabs: Salon :', `${message.channel.name}\n**=>** <#${message.channel.id}> `, true)
            .addField(':robot: Auteur du message :', `${authortag}`, true)
            .addField(':link: Message :', `[Cliquez ici !](${message.url})`, true)
            .setTimestamp()
            .setColor(12745742)
        logchannel.send(logembed);
    }
};
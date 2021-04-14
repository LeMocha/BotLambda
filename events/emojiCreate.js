const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'emojiCreate',
    async execute(client, emoji) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'EMOJI_CREATE',
        });

        const { executor } = fetchedLogs.entries.first();

        let type = ""

        if(emoji.animated){
            type = "Animé"
        } else {
            type = "Fixe"
        }

        const logembed = new MessageEmbed()
            .setTitle(`🔧 Un émoji a été créé !`)
            .addField('🗃️ Nom de l\'émoji :', `${emoji.name}`, true)
            .addField('⚙️ Type d\'émoji :', `${type}`, true)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nEmoji = ${emoji.id}\`\`\``, false)
            .addField(':robot: Ajouté par :', `${executor.username}#${executor.discriminator}`, false)
            .setTimestamp()
            .setColor(8359053)
        logchannel.send(logembed);
    }
};
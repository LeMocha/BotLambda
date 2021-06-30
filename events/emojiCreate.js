const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'emojiCreate',
    async execute(client, emoji) {

        if(emoji.guild.id !== "658437922256584725") return;

        console.log(emoji)

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
            .setTitle(`<:emojicreate:847195608015568966> Un émoji a été créé !`)
            .addField('<:roles:847181191273775115> Nom de l\'émoji :', `${emoji.name}`, true)
            .addField('<:type:847195608736727060> Type d\'émoji :', `${type}`, true)
            .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nUtilisateur = ${executor.id}\nEmoji = ${emoji.id}\`\`\``, false)
            .addField('<:bot:847186160483565628> Ajouté par :', `${executor.username}#${executor.discriminator}`, false)
            .setTimestamp()
            .setColor("#873e23")
        logchannel.send(logembed);
    }
};
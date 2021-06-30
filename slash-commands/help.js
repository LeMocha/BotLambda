const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    async execute (interaction, client) {
        const { prefix } = client.config;
        const { commands } = client;
        
        const embed = new MessageEmbed()
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL())
        .setColor("00ffff")
        .setTitle('Voici la liste de toutes mes commandes :')
        .setDescription(`\nMon préfixe est : \`${prefix}\` !`);
        let ticket = "";
        let utils = "";
        let music = "";
        let info = "";
        let lvl = "";
        let moderation = "";
        let fun = "";
        commands.forEach(command => {
            if(command.category === "ticket"){
                ticket += `**${prefix}${command.name} :** ${command.description}\n`;
            }
            if(command.category === "utilitaires"){
                utils += `**${prefix}${command.name} :** ${command.description}\n`;
            }
            if(command.category === "musique"){
                music += `**${prefix}${command.name} :** ${command.description}\n`;
            }
            if(command.category === "information"){
                info += `**${prefix}${command.name} :** ${command.description}\n`;
            }
            if(command.category === "levels"){
                lvl += `**${prefix}${command.name} :** ${command.description}\n`;
            }
            if(command.category === "moderation"){
                moderation += `**${prefix}${command.name} :** ${command.description}\n`;
            }
            if(command.category === "fun"){
                fun += `, **${prefix}${command.name}**`;
            }
        });
        ticket == "" || embed.addField(":ticket:  Ticket :", ticket, false);
        music == "" || embed.addField(":headphones:  Musique :", music, false);
        info == "" || embed.addField(":pushpin:  Informations :", info, false);
        lvl == "" || embed.addField("👑  Niveaux :", info, false);
        utils == "" || embed.addField(":hammer_pick:  Utilitaires :", utils, false);
        moderation == "" || embed.addField(":zap:  Modération :", moderation, false);
        fun !== "" || embed.addField(":tada:  Fun :", fun.slice(2), false);

        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
              type: 4,
              data: {
                content: undefined,
                flags: 256,
                embeds: [
                    embed
                ]
              },
            },
        })
    }
}
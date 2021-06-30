const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Permet d\'obtenir la liste de toutes les commandes ou d\'une commande en particulier.',
    args: false,
    guildOnly: false,
    aliases:['h'],
    category: "information",
    usage: "<commande>",
    execute(message, args) {
        const { prefix } = message.client.config;
        const { commands } = message.client;
        
        const embed = new MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setColor("00ffff")
            .setFooter(`Lancé par ${message.author.username}`, message.author.avatarURL());

        if (!args.length) {
            embed.setTitle('Voici la liste de toutes mes commandes :')
                .setDescription(`\nTu peux envoyer \`${prefix}help [commande]\` pour obtenir des informations sur une commande précise !`);
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
            fun == "" || embed.addField(":tada:  Fun :", fun.slice(2), false);
            return message.channel.send(embed);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            return message.reply('Ce n\'est pas une commande valide !').then(msg => msg.delete({ timeout: 5000}));
        }
        embed.addField(`✏️  **Nom :**`, `${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`);

        if (command.description) embed.addField(`<:Information:847181190486294548>  **Description :**`,`${command.description}`);
        embed.addField(`<:cle:847201672413315093>  **Utilisation :**`,`${prefix}${command.name} ${command.usage}`);
        if(command.category) embed.addField(`<:lien:847195607873093662>  Catégorie :`, `${command.category.charAt(0).toUpperCase() + command.category.slice(1)}`);

        message.channel.send(embed);
    },
};
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Permet d\'obtenir la liste de toutes les commandes ou d\'une commande en particulier.',
    args: false,
    guildOnly: false,
    category: "information",
    usage: "[commande]",
    execute(message, args) {
        const { prefix } = message.client.config;
        const { commands } = message.client;
        const embed = new MessageEmbed()
            .setFooter(message.client.user.username, message.client.user.avatarURL())
            .setTimestamp()
            .setColor("00ffff");

        if (!args.length) {
            embed.setTitle('Voici la liste de toutes mes commandes :')
                .setDescription(`\nTu peux envoyer \`${prefix}help [commande]\` pour obtenir des informations sur une commande précise !`);
            let ticket = "";
            let utils = "";
            let music = "";
            let info = "";
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
                if(command.category === "moderation"){
                    moderation += `**${prefix}${command.name} :** ${command.description}\n`;
                }
                if(command.category === "fun"){
                    fun += `, **${prefix}${command.name}**`;
                }
            });
            if(ticket !== "") embed.addField("🎫  Ticket :", ticket, false);
            if(music !== "") embed.addField("🎧  Musique :", music, false);
            if(info !== "") embed.addField("📌  Informations :", info, false);
            if(utils !== "") embed.addField("⚒️  Utilitaires :", utils, false);
            if(moderation !== "") embed.addField("⚡  Modération :", moderation, false);
            if(fun !== "") embed.addField("🎉  Fun :", fun.slice(2), false);
            return message.channel.send(embed);
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            return message.reply('Ce n\'est pas une commande valide !').then(msg => msg.delete({ timeout: 5000}));
        }
        embed.addField(`✏️  **Nom :**`, `${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`);

        if (command.description) embed.addField(`📋  **Description :**`,`${command.description}`);
        embed.addField(`🔧  **Utilisation :**`,`${prefix}${command.name} ${command.usage}`);
        if(command.category) embed.addField(`🔗  Catégorie :`, `${command.category.charAt(0).toUpperCase() + command.category.slice(1)}`);

        message.channel.send(embed);
    },
};
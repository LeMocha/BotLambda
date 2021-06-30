const { MessageEmbed } = require('discord.js');
const { logTime } = require('../utils/utils');
const { cyan, red } = require('chalk');

module.exports = {
    name: 'message',
    execute(client, message) {

        if(message.guild == undefined){
            // Ne rien faire.
        } else {
            if(message.guild.id !== "658437922256584725"){
                return;
            }
        }

        const prefix = client.config.prefix
        
        message.type !== "PINS_ADD" || message.delete();

        if (!message.content.startsWith(prefix) || message.author.bot) {
    
            try {
                let tiktok = /([a-z0-9-.]+)?(vm\.tiktok\.com)([a-z0-9-.]+)?/i;
                    if (tiktok.test(message)) {
                        message.delete();
                }
                let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
                if (discordInvite.test(message)) {
                    if (message.member.hasPermission('MANAGE_MESSAGES') || message.channel.id === "658438497614430249" || message.channel.parentID === "759784127552552970") { return }
                    else {
                        message.channel.send(`Le partage de liens discord n'est pas autorisé dans ce salon ${message.author}`)
                        message.delete();
                    }
                }
            } catch {
                console.log("Il est possible que je n'ai pas su déterminer si un lien discord / Tik Tok a été envoyé !")
            }
            return;
        }
    
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
    
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
    
        console.log(`[INFO] [${logTime()}]`, cyan(`${message.author.tag} à éxécuté la commande ${prefix}${commandName}`))
        const logchannel = client.channels.cache.get('658622224177168414');
        const commandelogembed = new MessageEmbed()
            .setTitle(`<:Information:847181190486294548> ${message.author.tag} A exécuté une commande !`)
            .addField('<:message:847181191446528070> Contenu du message :', `${message.content}`, false)
            .addField('<:id:847181190347882556> ID :', `\`\`\`ini\nUtilisateur = ${message.author.id}\nSalon = ${message.channel.id}\`\`\``, false)
            .addField('<:salon:847197984831438848> Salon :', `${message.channel.name}\n**=>** <#${message.channel.id}> `, true)
            .addField('<:utilisateur:847181191530151993> Commande utilisée :', `${prefix}${commandName}`, true)
            .setTimestamp()
        if (command.category === 'ticket') {commandelogembed.setColor("F93A2F");} else if (command.category === 'fun') {commandelogembed.setColor("FD0061");} else if (command.category === 'moderation') {commandelogembed.setColor("A652BB");} else if (command.category === 'musique') {commandelogembed.setColor("00C09A");} else if (command.category === 'information') {commandelogembed.setColor("0099E1");} else {commandelogembed.setColor("587E8D");}
        logchannel.send(commandelogembed);
    
        if (command.guildOnly && message.channel.type == 'text' || command.guildOnly && message.channel.type == 'news' || command.guildOnly == false) {
    
            if (command.args && !args.length) {
                return message.channel.send(`Tu n'as indiqué aucun argument, ${message.author}!`).then(msg => msg.delete({ timeout: 5000 }));
            }
        
            try {
                command.execute(message, args, client);
            } catch (error) {
                console.log(`[ERROR] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, red("Une erreur s'est produite lors de l'exécution d'une commande."))
                console.error(error);
                message.reply('Une erreur est survenue lors de l\'exécution de cette commande !').then(msg => msg.delete({ timeout: 5000 }))
            }
        } else {
            return message.reply('Je ne peux pas exécuter cette commande en Message Privé !').then(msg => msg.delete({ timeout: 5000 }));
        }
    }
};
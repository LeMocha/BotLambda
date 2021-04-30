const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: 'message',
    execute(client, message) {
        const prefix = client.config.prefix
        
        if(message.type === "PINS_ADD") message.delete();

        let crashlink = /([a-z0-9-.]+)?(https:\/\/)?(www\.)?([a-z0-9-.]+)?ColorfulRedFishingcat([a-z0-9-.]+)?/i;
        if (crashlink.test(message)){
            message.delete()
            let User = message.guild.member(message.author)
            User.send("Tu t'es cru plus malin que nous, mais c'est pas le cas... Sinon faillait que tout le monde utilise GNU/Linux, qui est invulnérable a ce bug").then(() => User.ban({reason: "COGIF-19 (dont woomy est vacinée !)"}))
        }

        if (!message.content.startsWith(prefix) || message.author.bot) {
    
            try {
                let tiktok = /([a-z0-9-.]+)?(vm\.tiktok\.com)([a-z0-9-.]+)?/i;
                    if (tiktok.test(message)) {
                        message.delete();
                }
                let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
                if (discordInvite.test(message)) {
                    if (message.member.hasPermission('MANAGE_MESSAGES')) { return }
                    else if (message.channel.id === "658438497614430249") { return }
                    else if(message.channel.parentID === "759784127552552970") { return }
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
        if (!client.commands.has(commandName)) return;
    
        const command = client.commands.get(commandName);
    
        console.log(`[INFO] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.cyan(`${message.author.tag} à éxécuté la commande ${prefix}${commandName}`))
        const logchannel = client.channels.cache.get('658622224177168414');
        const commandelogembed = new Discord.MessageEmbed()
            .setTitle(`:information_source: ${message.author.tag} A exécuté une commande !`)
            .addField(':speech_left: Contenu du message :', `${message.content}`, false)
            .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${message.author.id}\nSalon = ${message.channel.id}\`\`\``, false)
            .addField(':bookmark_tabs: Salon :', `${message.channel.name}\n**=>** <#${message.channel.id}> `, true)
            .addField(':robot: Commande utilisée :', `${prefix}${commandName}`, true)
            .setTimestamp()
        if (command.category === 'ticket') {commandelogembed.setColor("F93A2F");} else if (command.category === 'fun') {commandelogembed.setColor("FD0061");} else if (command.category === 'moderation') {commandelogembed.setColor("A652BB");} else if (command.category === 'musique') {commandelogembed.setColor("00C09A");} else if (command.category === 'information') {commandelogembed.setColor("0099E1");} else {commandelogembed.setColor("587E8D");}
        logchannel.send(commandelogembed); //Envoi de l'embed
    
    
        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('Je ne peux pas exécuter cette commande en Message Privé !').then(msg => msg.delete({ timeout: 5000 }));
        }
    
        if (command.args && !args.length) {
                return message.channel.send(`Tu n'as indiqué aucun argument, ${message.author}!`).then(msg => msg.delete({ timeout: 5000 }));
        }
    
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.log(`[ERROR] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.red("Une erreur s'est produite lors de l'exécution d'une commande."))
            console.error(error);
            message.reply('Une erreur est survenue lors de l\'exécution de cette commande !').then(msg => msg.delete({ timeout: 5000 }))
        }
    }
};
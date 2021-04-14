const Discord = require('discord.js');
const chalk = require('chalk');

var instant = (new Date()).getHours()+":"+(new Date()).getMinutes()+":"+(new Date()).getSeconds();

module.exports = {
    name: 'clear',
    description: 'Supprime des messages',
    args: true,
    guildOnly: false,
    usage: "<nombre de messages>",
    category: "moderation",
    execute(message, args) {
        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if(args[0]){
                if(!isNaN(args[0]) && args[0] >= 1 && args[0] <= 99){
                    message.channel.bulkDelete(args[0])
                    const embed = new Discord.MessageEmbed()
                        .setFooter(message.client.user.username, message.client.user.avatarURL())
                        .setTimestamp()
                        .setTitle(`${args[0]} message(s) supprimé(s) avec succès !`)
                        .setColor(3066993);
                    message.channel.send(embed)
                    console.log(`[INFO] [${instant}]`, chalk.green(`${message.author.tag} a supprimé ${args[0]} message(s) avec succès`));
                }
                else{
                    const embed = new Discord.MessageEmbed()
                        .setFooter(message.client.user.username, message.client.user.avatarURL())
                        .setTimestamp()
                        .setTitle(`Il faut choisir un nombre entre 1 et 99`)
                        .setColor(15158332);
                    message.channel.send(embed)
                    console.log(`[WARN] [${instant}]`, chalk.yellow(`${message.author.tag} n'a pas pu exécuter la commande !clear, il n'a pas entré un nombre valide.`));
                }
            }
        }
        else{
            const embed = new Discord.MessageEmbed()
                .setFooter(message.client.user.username, message.client.user.avatarURL())
                .setTimestamp()
                .setTitle(`Vous n'avez pas la permission de supprimer des messages.`)
                .setColor(15158332);
            message.channel.send(embed)
            console.log(`[WARN | ${hours}:${minutes}:${seconds}]`, chalk.yellow(`${message.author.tag} n'a pas pu exécuter la commande !clear, il n'a pas la permission.`));
        }
    },
};
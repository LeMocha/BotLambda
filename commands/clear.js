const { green, yellow } = require('chalk');
const { logTime } = require('../utils/utils');

module.exports = {
    name: 'clear',
    description: 'Supprime des messages',
    args: true,
    guildOnly: false,
    aliases: ['bulkdel', 'suppr'],
    usage: "<nbe de messages>",
    category: "moderation",
    async execute(message, args) {

        await message.delete()

        if (message.member.hasPermission('MANAGE_MESSAGES')) {

            if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= 99) {
                message.channel.bulkDelete(args[0])

                embedtitle = `${args[0]} message(s) supprimé(s) avec succès !`;
                embedcolor = "00ffff";

                console.log(`[INFO] [${logTime()}]`, green(`${message.author.tag} a supprimé ${args[0]} message(s) avec succès`));
            }
            else {
                embedtitle = `Il faut choisir un nombre entre 1 et 99`;
                embedcolor = "15158332";

                console.log(`[WARN] [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu exécuter la commande !clear, il n'a pas entré un nombre valide.`));
            }
        }
        else {
            embedtitle = `Vous n'avez pas la permission de supprimer des messages.`;
            embedcolor = "15158332";

            console.log(`[WARN] [${logTime()}]`, yellow(`${message.author.tag} n'a pas pu exécuter la commande !clear, il n'a pas la permission.`));
        }
        message.channel.send({
            embed: {
                color: embedcolor,
                title: embedtitle,
                timestamp: new Date(),
                footer: {
                    text: `Lancé par ${message.author.username}`,
                    icon_url: message.client.user.avatarURL(),
                },
            }
        })
    },
};
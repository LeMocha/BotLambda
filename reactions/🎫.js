const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: '🎫',
    async execute(reaction, user) {
        if (reaction.message.id === "725385779676971079") {
            if (reaction.emoji.name === "🎫") {
                await reaction.message.reactions.resolve("🎫").users.remove(user.id);
                uft = user.username.toLowerCase().replace(" ", "-")
                if (reaction.message.guild.channels.cache.find(c => c.name === `ticket-${uft}`)) {
                    const embed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setDescription(`Je n'ai pas pu ouvrir de ticket tu en as déjà un d'ouvert !\nTu ne peux ouvrir qu\'un seul ticket à la fois !`)
                        .setColor("00ffff");
                    user.send(embed).catch(() => reaction.message.channel.send(`<@${user.id}> Je n'ai pas pu ouvrir de ticket tu en as déjà un d'ouvert !\nTu ne peux ouvrir qu\'un seul ticket à la fois !`).then(msg => msg.delete({ timeout: 7000 })))
                    return;
                }
                reaction.message.guild.channels.create(`ticket-${user.username}`, {
                    parent: '744611270795460669'
                  }).then(chan => {
                    chan.updateOverwrite(user.id, {
                        VIEW_CHANNEL: true,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true
                    }).then(chan => {
                        chan.send(`** Hey <@!${user.id}> !**\n> Essayez d'expliquer pourquoi vous avez ouvert ce ticket en indiquant le plus de détails possible. \n> Notre équipe arrivera bientôt pour vous aider.`);
                    })
                    console.log(`[INFO] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.yellowBright(`Un ticket a été ouvert par ${user.username} !`));
                });
            }
        }
    },
};
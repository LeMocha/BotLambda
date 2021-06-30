const { MessageEmbed } = require('discord.js');
const { yellowBright } = require('chalk');
const { logTime } = require('../utils/utils');
const { getUserFromMention } = require('../utils/mentions');

module.exports = {
    name: 'ticket',
    async execute (button, client) {

        user = getUserFromMention(client, button.member.user.id)
        uft = user.username.toLowerCase().replace(" ", "-")

        if (client.channels.cache.find(c => c.name === `ticket-${uft}`)) {
            await client.api.interactions(button.id, button.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Je n'ai pas pu ouvrir de ticket tu en as déjà un d'ouvert !\nTu ne peux ouvrir qu\'un seul ticket à la fois !",
                        flags: 64,
                    },
                },
            });
            return;
        }

        client.guilds.cache.get('658437922256584725').channels.create(`ticket-${user.username}`, {
            parent: '744611270795460669'
            }).then(chan => {
            chan.updateOverwrite(user.id, {
                VIEW_CHANNEL: true,
                READ_MESSAGES: true,
                SEND_MESSAGES: true
            }).then(chan => {
                chan.send(`** Hey <@!${user.id}> !**\n> Essayez d'expliquer pourquoi vous avez ouvert ce ticket en indiquant le plus de détails possible. Notre équipe arrivera bientôt pour vous aider.\n\n> Si vous êtes ici pour un conseil/soucis en informatique, c'est dans <#718895551139283024> qu'il faut se réfugier !`);
            })
            console.log(`[INFO] [${logTime()}]`, yellowBright(`Un ticket a été ouvert par ${user.username} !`));
        });
        
        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 6,
                data: {
                    flags: false ? 1 << 6 : null,
                }
            }
        });

    },
};
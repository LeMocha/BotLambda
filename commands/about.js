module.exports = {
    name: 'about',
    description: 'En savoir plus à propos du bot.',
    args: false,
    guildOnly: false,
    aliases: ['bot', 'binfo'],
    usage: "",
    category: "information",
    execute(message) {
        message.delete();

        message.channel.send({embed: {
            color: "00ffff",
            title: "<:fluentwave:847186161457954816> Je suis le BotLambda !",
            fields: [
                {
                    name: "<:modifieruser:847181191236026398> Version :",
                    value: "1.3.0",
                    inline: false
                },
                {
                    name: "<:emojicreate:847195608015568966> Patch Note:",
                    value: "Mon patchnote a un peu grossi grand...\nIl a été déplacé dans la commande !patchonte x)",
                    inline: false,
                },
                {
                    name: "<:fun:847186161474469928> L'équipe BotLambda :",
                    value: "- TechLambda, Créateur\n- Le Mocha, Développeur\n- Slawk, Dictionnaire et Boîte à idées\n- Jim, Helpeur."
                }
            ],
            timestamp: new Date(),
            footer: {
                text: message.client.user.username,
                icon_url: message.client.user.avatarURL(),
            },
        }})
    },
};
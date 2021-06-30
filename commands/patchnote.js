module.exports = {
    name: 'patchnote',
    description: 'Apu d\'place dans l\'embed ? On vient ici !',
    args: false,
    guildOnly: false,
    aliases:["pn", "patch"],
    usage: "",
    category: "information",
    execute(message) {
        message.delete()
        
        message.channel.send({embed: {

            color: "00ffff",
            title: "Voici mon patchnote complet !",
            fields: [
                {
                    name: "<:moderation:847186161582735400> Optimisations :",
                    value: "- Transformation du code dupliqué en fonctions\n- Retirait des déclarations inutiles\n- Multiples autres optimisations mineures.",
                    inline: false,
                },
                {
                    name: "<:bug:847181190317342761> Bugs Corrigés :",
                    value: "- Déclenchement inutile de la log des changements du pseudo pour une modification autre que le pseudo\n- Le lien envoyé pour les musiques jouées ne sont pas les bons lorsque le bot change de musique\n- Multiples soucis avec les logs liés a l'event \"MessageUpdate\" et \"UserUpdate\"\n- Le bot de considère les salons d'annonces comme des salons vocaux\n- Clé d'API Privée rendue publique\n- Il faut s'auto-mentionner pour obtenir son propre user-info\n- Pas mal de bugs sur les commandes de ticket",
                    inline: false,
                },
                {
                    name: "<:emojicreate:847195608015568966> Modifications :",
                    value: "- Ajout slash commands : help, play, queue, skip, avatar, stop, userinfo, ping, lien\n- Ajout des boutons Discord \n- Ajout d'alias\n- Modification commande banhammer avec ajout d'une phrase amusante\n- Ajout !qdel - retire une musique de la file d'attente\n- Ajout !qreset - supprime toute la file d'attente sauf la musique en cours\n- Rendre les couleurs des embeds et les emojis cohérents\n- Multiples améliorations mineures sur une majorité des commandes\n- Ajout commande patchnote\n- Retrait de la commande Jimbot.",
                    inline: false,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: `Botlambda's Patchnote`,
                icon_url: message.client.user.avatarURL(),
            },
            
        }})

    },
};
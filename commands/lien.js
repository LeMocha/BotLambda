module.exports = {
    name: 'lien',
    description: 'Donne la liste de tous les liens utiles',
    args: false,
    guildOnly: false,
    aliases: ['l', 'link'],
    usage: "",
    category: "information",
    execute(message) {

        message.delete()

        message.channel.send({
            embed: {
                color: "00ffff",
                title: 'Clique sur un bouton pour obtenir le lien que tu souhaites !',
                type: 'rich',
                timestamp: new Date(),
                footer: {
                    text: `Lancé par ${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
            },
            components: [
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "emoji": {
                                id: "795931203538518017",
                                animated: "false",
                            },
                            "style": 2,
                            "custom_id": "link_discord"
                        },
                        {
                            "type": 2,
                            "emoji": {
                                id: "831801590184542259",
                                animated: "false",
                            },
                            "style": 2,
                            "custom_id": "link_tls"
                        },
                        {
                            "type": 2,
                            "emoji": {
                                id: "795931203395125258",
                                animated: "false",
                            },
                            "style": 2,
                            "custom_id": "link_yt"
                        }
                    ]

                },
                {
                    "type":1,
                    "components": [
                        {
                            "type": 2,
                            "emoji": {
                                id: "795931203509289010",
                                animated: "false",
                            },
                            "style": 2,
                            "custom_id": "link_twitch"
                        },
                        {
                            "type": 2,
                            "emoji": {
                                id: "795931203865542686",
                                animated: "false",
                            },
                            "style": 2,
                            "custom_id": "link_twitter"
                        },
                        {
                            "type": 2,
                            "emoji": {
                                id: "831804907082219576",
                                animated: "false",
                            },
                            "style": 2,
                            "custom_id": "link_mail"
                        }
                    ]
                }
            ],
        })
    }
};
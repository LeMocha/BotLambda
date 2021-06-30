module.exports = {
    name: 'drama',
    description: 'UNE MENACE A ETE DETECTEE !',
    args: false,
    guildOnly: false,
    aliases:['drm'],
    usage: "",
    category: "fun",
    execute(message) {

        message.delete()

        message.channel.send({embed: {
            color: 0xFF0000,
            title: "**<:croix:795931202997452850> Attention**",
            description: "**Un drama a été détecté**\nContinuer cette discussion risque de mener à un énième TechLambdrama",
            timestamp: new Date(),
            footer: {
                text: `Lancé par ${message.author.username}`,
                icon_url: message.client.user.avatarURL(),
            },
        }})
        
    },
};
module.exports = {
    name: 'basedrama',
    description: 'LA BASE VIRALE ~~VPS~~ DRAMA A ETE MISE A JOUR !',
    args: false,
    guildOnly: false,
    aliases: ['bdrama'],
    usage: "",
    category: "fun",
    execute(message) {

        message.delete()

        message.channel.send({
            embed: {
                color: 0x6EFF33,
                title: "**<:valide:795931203198386187> Information**",
                description: "**La base drama a été mise à jour**\nVous pouvez continuer cette discussion en toute tranquilité",
                timestamp: new Date(),
                footer: {
                    text: `Lancé par ${message.author.username}`,
                    icon_url: message.client.user.avatarURL(),
                },
            }
        })
        
    },
};
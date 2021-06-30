module.exports = {
    name: 'gpk',
    description: 'Kev Adams come back !',
    args: false,
    guildOnly: false,
    aliases:["gepakompris"],
    usage: "",
    category: "fun",
    execute(message) {
        message.delete()
        
        message.channel.send({embed: {
            color: "00ffff",
            title: "Gepakompris, c'est comme un abonné Free, il a tout compris !",
            timestamp: new Date(),
            footer: {
                text: `Lancé par ${message.author.username}`,
                icon_url: message.client.user.avatarURL(),
            },
        }})

    },
};
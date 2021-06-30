module.exports = {
    name: '',
    description: '',
    args: false,
    guildOnly: false,
    usage: "",
    category: "information",
    execute(message, args) {

        const embed = {
            color: "00ffff",
            title: '',
            url: '',
            author: {
                name: '',
                icon_url: '',
                url: '',
            },
            description: '',
            thumbnail: {
                url: '',
            },
            fields: [
                {
                    name: '',
                    value: '',
                    inline: false,
                },
            ],
            image: {
                url: '',
            },
            timestamp: new Date(),
            footer: {
                text: '',
                icon_url: '',
            },
        };
        message.channel.send({embed: embed})
    },
};
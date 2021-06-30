module.exports = {
    name: 'link_twitch',
    async execute (button, client) {

        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "https://www.twitch.tv/techlambdalive",
                    flags: 64,
                },
            },
        });
        
    },
};
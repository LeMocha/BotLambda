module.exports = {
    name: 'link_yt',
    async execute (button, client) {

        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "https://www.youtube.com/techlambda",
                    flags: 64,
                },
            },
        });
        
    },
};
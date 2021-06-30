module.exports = {
    name: 'link_discord',
    async execute (button, client) {

        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "https://discord.gg/Vqp95vj",
                    flags: 64,
                },
            },
        });
        
    },
};
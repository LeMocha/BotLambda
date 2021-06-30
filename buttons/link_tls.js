module.exports = {
    name: 'link_tls',
    async execute (button, client) {

        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "https://discord.gg/srDSrpQddN",
                    flags: 64,
                },
            },
        });
        
    },
};
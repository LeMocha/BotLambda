module.exports = {
    name: 'link_twitter',
    async execute (button, client) {

        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "https://twitter.com/_TechLambda",
                    flags: 64,
                },
            },
        });
        
    },
};
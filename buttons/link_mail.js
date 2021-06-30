module.exports = {
    name: 'link_mail',
    async execute (button, client) {

        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "contact.techlambda@gmail.com",
                    flags: 64,
                },
            },
        });
        
    },
};
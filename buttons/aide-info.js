module.exports = {
    name: 'aide-info',
    async execute (button, client) {

        const server = client.guilds.cache.get("658437922256584725")

        let message = ""
        
        if(server.members.cache.get(button.member.user.id).roles._roles.some(r => r.id == "718971778323710084") == true){
            server.members.cache.get(button.member.user.id).roles.remove("718971778323710084")
            message = "Je viens de te retirer le rôle aide informatique !"
        } else {
            server.members.cache.get(button.member.user.id).roles.add("718971778323710084")
            message = "Je viens de t'attribuer le rôle aide informatique !"
        }

        await client.api.interactions(button.id, button.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: message,
                    flags: 64,
                },
            },
        });

    },
};
module.exports = {
    name: 'dev',
    async execute (button, client) {

        const server = client.guilds.cache.get("658437922256584725")

        let message = ""

        if(server.members.cache.get(button.member.user.id).roles._roles.some(r => r.id == "759792630790881291") == true){
            server.members.cache.get(button.member.user.id).roles.remove("759792630790881291")
            message = "Je viens de te retirer le rôle développeur !"
        } else {
            server.members.cache.get(button.member.user.id).roles.add("759792630790881291")
            message = "Je viens de t'ajouter le rôle développeur !"
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
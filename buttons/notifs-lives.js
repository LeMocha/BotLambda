module.exports = {
    name: 'notifs-lives',
    async execute (button, client) {

        const server = client.guilds.cache.get("658437922256584725")
        
        let message = ""

        if(server.members.cache.get(button.member.user.id).roles._roles.some(r => r.id == "734957588378157128") == true){
            server.members.cache.get(button.member.user.id).roles.remove("734957588378157128")
            message = "Je viens de te retirer le rôle notif lives !"
        } else {
            server.members.cache.get(button.member.user.id).roles.add("734957588378157128")
            message = "Je viens de t'ajouter le rôle notif lives !"
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
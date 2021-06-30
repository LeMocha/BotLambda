const { blue } = require("chalk");
const { logTime } = require("../utils/utils");

module.exports = {
    name: 'ready',
    async execute(client) {
        console.log(`[NODE] [${logTime()}]`, blue(`Je suis connecté en tant que ${client.user.tag} avec ${client.commandNumber} commandes !`));
        client.user.setActivity("Oncle Lambda et Papa Mocha", { type: 'LISTENING' });

        //Pour faciliter la suppression de / commands
        /*const commands = await client.api
            .applications(client.user.id)
            .guilds(guildId)
            .commands.get()
        console.log(commands)

        const getApp = (guildId) => {
            const app = client.api.applications(client.user.id)
            if (guildId){
                app.guilds(guildId)
            }
            return app
        }
        await getApp(guildId).commands(' ').delete();*/

    }
};

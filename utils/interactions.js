const { APIMessage } = require("discord.js")

module.exports = {
    createAPIMessage : async function (chanid, content, client){
        const {data, files} = await APIMessage.create(
            client.channels.resolve(chanid),
            content
        )
        .resolveData()
        .resolveFiles()

        return { ...data, files }
    }
}

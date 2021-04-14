const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'channelUpdate',
    async execute(client, channel) {
        const logchannel = client.channels.cache.get('658622224177168414');

        const fetchedLogs = await logchannel.guild.fetchAuditLogs({
            limit: 1,
            type: 'CHANNEL_UPDATE',
        });

        const { executor, changes } = fetchedLogs.entries.first();

        console.log(executor)

        console.log(changes)

        console.log(changes.getLenght())

        console.log(channel.id)
    }
};
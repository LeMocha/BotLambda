const { MessageEmbed } = require("discord.js");

let guildid = "658437922256584725"

module.exports = {
    slash: 'both',
    testOnly: true,
    description: '',
    callback: (interaction) => {
        let member = interaction.channel.members.get(interaction.member.user.id)
        return
    },
};
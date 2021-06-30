module.exports = {
  name: 'roles',
  description: 'Message pour obtenir des rôles spécifiques.',
  args: false,
  guildOnly: false,
  aliases: ['rl'],
  usage: "",
  category: "pv",
  execute(message) {
    message.delete()

    message.channel.send({
      content: "Clique sur les boutons pour te mettre ou enlever des rôles !",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "Aide Informatique",
              style: 4,
              emoji: { "name": "💾" },
              custom_id: "aide-info",
              inline: true,
            },
            {
              type: 2,
              label: "Développeur",
              style: 3,
              emoji: { "name": "🔧" },
              custom_id: "dev",
              inline: true,
            },
            {
              type: 2,
              label: "Notifs Lives",
              style: 1,
              emoji: { "name": "📺" },
              custom_id: "notifs-lives",
              inline: true,
            }
          ]
        },
      ],
    })
  },
};
module.exports = {
  name: "ping",
  description: 'Donne le ping entre moi et Discord',
  args: false,
  guildOnly: false,
  aliases:[],
  usage: "",
  category: "information",
  execute(message, {}, client) {
    message.delete()
    
    if (Math.random() <= 0.01) {
      message.channel.send({
          embed: {
            color: "00ffff",
            title: "🔥 Oh ! Un hacker lambda a modifié mon code !",
            image: {
                url: "https://i.gifer.com/XYkc.gif",
            },
            timestamp: new Date(),
            footer: {
                text: `Lancé par ${message.author.username}`,
                icon_url: message.author.avatarURL(),
            },
        }
      })

    } else {

      let p = client.ws.ping

      let color = ''

      if (p <= 100) {
          color = "00D166"
      } else if (p > 100 && p <= 250) {
          color = "F8C300"
      } else {
          color = "F93A2F"
      }

      message.channel.send({
        color: color,
        title: '<:pong:847181191471693835> Pong !',
        description: `Mon ping est de : ${p}ms`,
        timestamp: new Date(),
        footer: {
          text: `Lancé par ${message.author.username}`,
          icon_url: message.author.avatarURL(),
        },
      })
    }

  },
}

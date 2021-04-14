const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: 'Donne le ping entre moi et Discord',
  args: false,
  guildOnly: false,
  usage: "",
  category: "information",
  execute(message) {
    if (Math.random() <= 0.01) {
      const embed = new Discord.MessageEmbed()
      .setTitle("🔥 Oh ! Un hacker lambda a modifié mon code !")
      .setImage("https://i.gifer.com/XYkc.gif")
      message.channel.send(embed)
    }
    else {
      message.channel.send(`🏓 Calcul en cours...`).then((msg) => {
        var p = (Math.floor(msg.createdTimestamp - message.createdTimestamp))

        const e = new Discord.MessageEmbed()
          .setTitle("🏓 Pong !")
          .setDescription(`Mon ping est de : ${p}ms`);

        if (p <= 100) {
          e.setColor("00D166");
        } else if (p > 100 && p <= 250) {
          e.setColor("F8C300");
        } else {
          e.setColor("F93A2F");
        }

        msg.edit(e);
        msg.edit("\u200B");
        return;
      });
    }

  },
}

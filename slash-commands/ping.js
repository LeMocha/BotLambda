const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'ping',
  execute ({},client) {
    if (Math.random() <= 0.01) {

        const embed = new MessageEmbed()
            .setTitle("🔥 Oh ! Un hacker lambda a modifié mon code !")
            .setImage("https://i.gifer.com/XYkc.gif")
        return embed

      } else {

        let p = client.ws.ping

        const e = new MessageEmbed()
            .setTitle("🏓 Pong !")
            .setDescription(`Mon ping est de : ${p}ms`);
  
        if (p <= 100) {
            e.setColor("00D166");
        } else if (p > 100 && p <= 250) {
            e.setColor("F8C300");
        } else {
            e.setColor("F93A2F");
        }
        
        return e
    }
  }
}
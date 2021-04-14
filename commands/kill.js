const {getUserFromMention} = require("../utils/mentions");
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: 'kill',
    description: 'Permet de tuer quelqu\'un ou de se suicider.',
    args: false,
    guildOnly: true,
    usage: "<user>",
    category: "fun",
    execute(message, args, client) {
      let Embed = new MessageEmbed

      if(args.length === 0){
          Embed.setTitle(`${message.author.tag} se suicide (quel con) :`);
          Embed.setImage("https://media.tenor.com/images/405fabaf6af376d244649c02795f01be/tenor.gif");
          Embed.setColor(message.author.displayHexColor);
          return message.channel.send(Embed);
      }
      let member = getUserFromMention(client, args[0])
      if(member === undefined) {
          member = message.guild.members.cache.get(args[0])
      }
      if(member === undefined) {
          Embed.setTitle(`Le Bot Lambda est décédé... Il n'a pas su trouvé qui tu voulais tuer...`);
          Embed.setImage("https://i.makeagif.com/media/5-13-2016/UpuRDK.gif");
          return message.channel.send(Embed);
      } else {
          if(member.id === message.author.id) {
              Embed.setTitle(`${message.author.tag} se suicide (quel con) :`);
              Embed.setImage("https://media.tenor.com/images/405fabaf6af376d244649c02795f01be/tenor.gif");
              Embed.setColor(message.author.displayHexColor);
              return message.channel.send(Embed);
          }
        Embed.setTitle(`${message.author.tag} à écourté la vie de ${client.users.cache.get(member.id).tag} :`);
        Embed.setImage("https://data.photofunky.net/output/image/e/7/b/5/e7b5c3/photofunky.gif");
        Embed.setColor(member.displayHexColor);
        return message.channel.send(Embed);
      }

    },
};
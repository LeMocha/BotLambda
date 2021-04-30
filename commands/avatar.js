const { MessageEmbed } = require("discord.js");
const { getUserFromMention } = require('../utils/mentions');

module.exports = {
    name: 'avatar',
    description: 'Affiche l\'avatar de l\'utilisateur',
    args: false,
    guildOnly: true,
    usage: "<user>",
    category: "utilitaires",
    execute(message, args, client) {
      let Embed = new MessageEmbed

      let member = getUserFromMention(client, args[0])
      if(args[0] === undefined) {
          Embed.setTitle(`📸  Votre avatar ! :`);
          Embed.setImage(message.author.displayAvatarURL({format :'png', dynamic : true, size : 4096}));
          Embed.setColor(message.guild.members.cache.get(message.author.id).displayHexColor);
          return message.channel.send(Embed);
      }
      else if (member === undefined){z
          message.channel.send("Je ne trouve pas cet utilisateur.")
          return
      } else {
        Embed.setTitle(`📸  Avatar de ${member.tag} :`);
        Embed.setImage(member.displayAvatarURL({format :'png', dynamic : true, size : 4096}));
        Embed.setColor(message.guild.members.cache.get(member.id).displayHexColor);
        return message.channel.send(Embed);
      }

    },
};
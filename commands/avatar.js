const { getUserFromMention } = require('../utils/mentions');

module.exports = {
  name: 'avatar',
  description: 'Affiche l\'avatar de l\'utilisateur',
  args: false,
  guildOnly: true,
  aliases: ['pp'],
  usage: "<user>",
  category: "utilitaires",
  execute(message, args, client) {
    message.delete()

    let member = getUserFromMention(client, args[0])

    if(args[0] === undefined) {
      avatartitle = `<:fluentflash:847200033417592872>  Votre avatar !`;
      imageurl = message.author.displayAvatarURL({format :'png', dynamic : true, size : 4096});
    }

    else if (member === undefined){
      avatartitle = "Je ne trouve pas cet utilisateur !";
      imageurl = undefined;
    }
      
    else {
      avatartitle = `<:fluentflash:847200033417592872>  Avatar de ${member.tag} :`;
      imageurl = member.displayAvatarURL({format :'png', dynamic : true, size : 4096});
    }

    return message.channel.send({
      embed: {
        color: "00ffff",
        title: avatartitle,
        image: {
          url: imageurl,
        },
        timestamp: new Date(),
        footer: {
          text: `Lancé par ${message.author.username}`,
          icon_url: message.author.avatarURL(),
        },
      }
    });
  },
};
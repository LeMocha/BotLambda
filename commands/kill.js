const {getUserFromMention} = require("../utils/mentions");

module.exports = {
    name: 'kill',
    description: 'Permet de tuer quelqu\'un ou de se suicider.',
    args: false,
    guildOnly: true,
    aliases:[],
    usage: "<user>",
    category: "fun",
    execute(message, args, client) {
      message.delete()

      if(args.length === 0){
        return message.channel.send({
          embed:{
            color:"00ffff",
            title:`${message.author.tag} se suicide (quel con) :`,
            footer: {
              text: `Lancé par ${message.author.username}`,
              icon_url: message.author.avatarURL(),
            },
          },
          image: {
              url: 'https://media.tenor.com/images/405fabaf6af376d244649c02795f01be/tenor.gif',
          },
        })
      }

      let member = getUserFromMention(client, args[0])
      if(member === undefined) {
        member = message.guild.members.cache.get(args[0])
      }

      if(member === undefined) {
          return message.channel.send({
            embed:{
              color:"00ffff",
              title:`Le Bot Lambda est décédé... Il n'a pas su trouvé qui tu voulais tuer...`,
              footer: {
                text: `Lancé par ${message.author.username}`,
                icon_url: message.author.avatarURL(),
            },
            },
            image: {
                url: 'https://i.makeagif.com/media/5-13-2016/UpuRDK.gif',
            },
          })
      } else {
          if(member.id === message.author.id) {
              return message.channel.send({
                embed:{
                  color:"00ffff",
                  title:`${message.author.tag} se suicide (quel con) :`,
                  footer: {
                    text: `Lancé par ${message.author.username}`,
                    icon_url: message.author.avatarURL(),
                },
                },
                image: {
                    url: 'https://media.tenor.com/images/405fabaf6af376d244649c02795f01be/tenor.gif',
                },
              })
          }
          return message.channel.send({
            embed:{
              color:"00ffff",
              title:`${message.author.tag} à écourté la vie de ${client.users.cache.get(member.id).tag} :`,
              footer: {
                text: `Lancé par ${message.author.username}`,
                icon_url: message.author.avatarURL(),
            },
            },
            image: {
                url: 'https://data.photofunky.net/output/image/e/7/b/5/e7b5c3/photofunky.gif',
            },
          })
      }

    },
};
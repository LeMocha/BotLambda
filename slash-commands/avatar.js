const { getUserFromMention } = require("../utils/mentions");

module.exports = {
  name: 'avatar',
  description: 'Obtenir la photo de profil d\'un membre.',
  async execute(interaction, client) {
    let executoruser = getUserFromMention(client, interaction.member.user.id)

    if (interaction.data.options === undefined) {
      embedtitle = `Votre avatar !`
      imageurl = executoruser.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
    }
    else {
      let member = getUserFromMention(client, interaction.data.options[0].value)

      if (member === undefined) {
        embedtitle = "Je ne trouve pas cet utilisateur !"
        imageurl = null
      }

      else {
        embedtitle = `Avatar de ${member.tag} :`
        imageurl = member.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
      }
    }

    await client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: undefined,
          flags: 256,
          embeds: [
            {
              type: "rich",
              color: 65535, //RGB => INT formule =  256*256*Rouge+256*Bleu+Vert
              title: "<:fluentflash:847200033417592872>"+embedtitle,
              timestamp: new Date(),
              image: {
                url: imageurl
              },
            },
          ]
        },
      },
    });
  }
}
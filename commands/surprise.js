const { MessageAttachment, MessageEmbed } = require('discord.js');
const { getUserFromMention } = require('../utils/mentions');

module.exports = {
    name: 'surprise',
    description: 'Ouvre le ! Tu vas être surpris !',
    args: false,
    guildOnly: false,
    aliases:['spr'],
    usage: "",
    category: "fun",
    execute(message, args, client) {
        message.delete()

        const attachment = new MessageAttachment('./images/surprise.jpg');
        const embed = new MessageEmbed()
            .setTitle("**:one: Vous avez reçu un nouveau message**")
            .attachFiles(attachment)
            .setImage("attachment://surprise.jpg")
            .setColor(0xFFFF00)
            .setFooter(`Lancé par ${message.author.username}`, message.author.avatarURL());

        if (args[0] !== undefined) {

            let member = getUserFromMention(client, args[0])
            if (member === undefined) {
                member = message.guild.members.cache.get(args[0])
            }
            if (member === undefined) {
                message.channel.send("Je ne trouve pas cet utilisateur.")
                return
            }
            try{
            embed.setDescription(`**FELICITATIONS ${member.username.toUpperCase()} VOUS AVEZ GAGNÉ A LA LOTERIE TECHLAMBDA** !\nPour recevoir votre cadeau, j'ai besoin de :\n- Vos coordonnées bancaires\n- Votre adresse\n- Votre cerveau`)
            } catch {
            embed.setDescription(`**FELICITATIONS ${member.user.username.toUpperCase()} VOUS AVEZ GAGNÉ A LA LOTERIE TECHLAMBDA** !\nPour recevoir votre cadeau, j'ai besoin de :\n- Vos coordonnées bancaires\n- Votre adresse\n- Votre cerveau`)
            }
        } else {
            embed.setDescription(`**FELICITATIONS ${message.author.username.toUpperCase()} VOUS AVEZ GAGNÉ A LA LOTERIE TECHLAMBDA** !\nPour recevoir votre cadeau, j'ai besoin de :\n- Vos coordonnées bancaires\n- Votre adresse\n- Votre cerveau`)
        }
        message.channel.send(embed)
    },
};
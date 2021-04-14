const { MessageAttachment, MessageEmbed } = require('discord.js');
const { getUserFromMention } = require('../utils/mentions');

module.exports = {
    name: 'surprise',
    description: 'Ouvre le ! Tu vas être surpris !',
    args: false,
    guildOnly: false,
    usage: "Aucun Usage",
    category: "fun",
    execute(message, args) {
        message.delete()

        if (args[0] !== undefined) {

            let member = getUserFromMention(args[0])
            if (member === undefined) {
                member = message.guild.members.cache.get(args[0])
            }
            if (member === undefined) {
                message.channel.send("Je ne trouve pas cet utilisateur.")
                return
            }

            const attachment = new MessageAttachment('./ressources/surprise.jpg');
            const embed = new MessageEmbed()
                .setTitle("**:one: Vous avez reçu un nouveau message**")
                .setDescription(`**FELICITATIONS ${member.user.username.toUpperCase()} VOUS AVEZ GAGNÉ A LA LOTERIE TECHLAMBDA** !\nPour recevoir votre cadeau, j'ai besoin de :\n- Vos coordonnées bancaires\n- Votre adresse\n- Votre cerveau`)
                .attachFiles(attachment)
                .setImage("attachment://surprise.jpg")
                .setColor(0xFFFF00);
            message.channel.send(embed)
        } else {
            const attachment = new MessageAttachment('./ressources/surprise.jpg');
            const embed = new MessageEmbed()
                .setTitle("**:one: Vous avez reçu un nouveau message**")
                .setDescription(`**FELICITATIONS ${message.author.username.toUpperCase()} VOUS AVEZ GAGNÉ A LA LOTERIE TECHLAMBDA** !\nPour recevoir votre cadeau, j'ai besoin de :\n- Vos coordonnées bancaires\n- Votre adresse\n- Votre cerveau`)
                .attachFiles(attachment)
                .setImage("attachment://surprise.jpg")
                .setColor(0xFFFF00);
            message.channel.send(embed)

        }
    },
};
module.exports = {
    name: "bescherelle",
    description: 'ATTAQUE BESCHERELLE !',
    args: false,
    guildOnly: false,
    aliases: ['dico', 'dictionnaire'],
    usage: "",
    category: "fun",
    execute(message) {

        message.delete();
        
        message.channel.send({
            files: [{
                attachment:"./images/Attaque_Bescherelle.jpg",
            }],
            embed: {
                color:"00ffff",
                title:"**J'ai mal à mon Slawk...**",
                image: {
                    url:"attachment://Attaque_Bescherelle.jpg",
                },
                footer: {
                  text: `Lancé par ${message.author.username}`,
                  icon_url: message.author.avatarURL(),
                },
            }
        })
    },
};

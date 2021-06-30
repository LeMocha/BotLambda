module.exports = {
    name: 'istrue',
    description: 'Une réponse simple a toutes vos questions',
    args: false,
    guildOnly: false,
    aliases:['ist'],
    usage: "<votre question>",
    category: "fun",
    execute(message) {
        const rep = Math.random()

        if(rep >= 0.5){
            message.channel.send("Vrai")
        }
        else{
            message.channel.send("Faux !")
        }
    },
};
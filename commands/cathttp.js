const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'cathttp',
    description: 'Les chats vous apprennent les codes HTTP !',
    args: true,
    guildOnly: false,
    usage: "",
    category: "fun",
    execute(message, args) {

        args = args[0]

        if(args > 99 && args < 600){
            if(args.slice(0,1) == 1 && args > 102){
                message.channel.send("Oh non ! Mon chat n'a pas ce code de disponible !")
                return
            }
            if(args.slice(0,1) == 2 && args > 207){
                message.channel.send("Oh non ! Mon chat n'a pas ce code de disponible !")
                return
            }
            if(args.slice(0,1) == 3 && args > 307){
                message.channel.send("Oh non ! Mon chat n'a pas ce code de disponible !")
                return
            }
            if(args.slice(0,1) == 4 && args > 426 && args != 429 && args != 431 && args != 444 && args != 450 && args!= 451 && args != 499){
                message.channel.send("Oh non ! Mon chat n'a pas ce code de disponible !")
                return
            }
            if(args == 419){
                message.channel.send("Oh non ! Mon chat n'a pas ce code de disponible !")
                return
            }
            if(args.slice(0,1) == 5 && args > 511 && args != 599){
                message.channel.send("Oh non ! Mon chat n'a pas ce code de disponible !")
                return
            }
         
            const embed = new MessageEmbed()
                .setImage(`https://http.cat/${args}.jpg`)
            message.channel.send(embed)

        }
        else {
            message.channel.send("Oh non ! Mon chat n'a pas ce code de disponible !")
        }

    }
}


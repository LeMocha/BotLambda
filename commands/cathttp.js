module.exports = {
    name: 'cathttp',
    description: 'Les chats vous apprennent les codes HTTP !',
    args: true,
    guildOnly: false,
    aliases: ['htpp', 'chttp'],
    usage: "",
    category: "fun",
    execute(message, args) {

        message.delete()

        let errored = 0

        args = args[0]

        if(args > 99 && args < 600){
            errored =1
        }
        if(args.slice(0,1) == 1 && args > 102){
            errored = 1
        }
        if(args.slice(0,1) == 2 && args > 207){
            errored = 1
        }
        if(args.slice(0,1) == 3 && args > 307){
            errored = 1
        }
        if(args.slice(0,1) == 4 && args > 426 && args != 429 && args != 431 && args != 444 && args != 450 && args!= 451 && args != 499){
            errored = 1
        }
        if(args == 419){
            errored = 1
        }
        if(args.slice(0,1) == 5 && args > 511 && args != 599){
            errored = 1
        }
        if (errored == 1){
            message.channel.send({
                embed: {
                    color:"00ffff",
                    title: "Oh non ! Mon chat n'a pas ce code de disponible !",
                }
            })
        } else {
            message.channel.send({
                embed: {
                conor:"00ffff",
                image: {
                    url:`https://http.cat/${args}.jpg`,
                },
                footer: {
                  text: `Lancé par ${message.author.username}`,
                  icon_url: message.author.avatarURL(),
                },
                }
            })
        }

    }
}


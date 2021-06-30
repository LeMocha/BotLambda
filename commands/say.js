module.exports = {
    name: 'say',
    description: 'Vous permet de faire parler le bot',
    args: true,
    guildOnly: true,
    aliases:['s'],
    category: "utilitaires",
    usage: "<message>",
    execute(message, args) {

        message.delete();

        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.send(args.join(" "));
        }
        else {
            message.channel.send("Vous n'avez pas la permission de faire cela !");
        }
    }
}
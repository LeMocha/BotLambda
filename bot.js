const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const raw = fs.readFileSync('config.json');

client.commands = new Discord.Collection();
client.reactions = new Discord.Collection();
client.rreactions = new Discord.Collection();

client.config = JSON.parse(raw);
client.queue = new Map();

const { prefix, token } = client.config;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const reactionFiles = fs.readdirSync('./reactions').filter(file => file.endsWith('.js'));
const rreactionFiles = fs.readdirSync('./r-reactions').filter(file => file.endsWith('.js'));


let commandNumber = 0;
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    commandNumber++;
}
for (const file of reactionFiles) {
    const reaction = require(`./reactions/${file}`);
    client.reactions.set(reaction.name, reaction);
}
for (const file of rreactionFiles) {
    const rreaction = require(`./r-reactions/${file}`);
    client.rreactions.set(rreaction.name, rreaction);
}

client.on('ready', () => {
    console.log(`[NODE] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.blue(`Je suis connecté en tant que ${client.user.tag} et avec ${commandNumber} commandes !`));
    client.user.setActivity("Oncle Lambda et Papa Mocha", { type: 'LISTENING' });
});

client.on('message', message => {

    if(message.type === "PINS_ADD") message.delete();

    if (!message.content.startsWith(prefix) || message.author.bot) {

        try {
            let tiktok = /([a-z0-9-.]+)?(wm\.tiktok\.com)([a-z0-9-.]+)?/i;
                if (tiktok.test(message)) {
                    message.delete();
            }
            let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
            if (discordInvite.test(message)) {
                if (message.member.hasPermission('MANAGE_MESSAGES')) { return }
                else if (message.channel.id === "658438497614430249") { return }
                else if(message.channel.parentID === "759784127552552970") { return }
                else {
                    message.channel.send(`Le partage de liens discord ne sont pas autorisés dans ce salon ${message.author}`)
                    message.delete();
                }
            }
        } catch {
            console.log("Il est possible que je n'ai pas su déterminer si un lien discord a été envoyé !")
        }
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    console.log(`[INFO] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.cyan(`${message.author.tag} à éxécuté la commande ${prefix}${commandName}`))
    const logchannel = client.channels.cache.get('658622224177168414');
    const commandelogembed = new Discord.MessageEmbed()
        .setTitle(`:information_source: ${message.author.tag} A exécuté une commande !`)
        .addField(':speech_left: Contenu du message :', `${message.content}`, false)
        .addField(':label: ID :', `\`\`\`ini\nUtilisateur = ${message.author.id}\nChannel = ${message.channel.id}\`\`\``, false)
        .addField(':bookmark_tabs: Salon :', `${message.channel.name}\n**=>** <#${message.channel.id}> `, true)
        .addField(':robot: Commande utilisée :', `${prefix}${commandName}`, true)
        .setTimestamp()
    if (command.category === 'ticket') {commandelogembed.setColor("F93A2F");} else if (command.category === 'fun') {commandelogembed.setColor("FD0061");} else if (command.category === 'moderation') {commandelogembed.setColor("A652BB");} else if (command.category === 'musique') {commandelogembed.setColor("00C09A");} else if (command.category === 'information') {commandelogembed.setColor("0099E1");} else {commandelogembed.setColor("587E8D");}
    logchannel.send(commandelogembed); //Envoi de l'embed


    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Je ne peux pas exécuter cette commande en Message Privé !').then(msg => msg.delete({ timeout: 5000 }));
    }

    if (command.args && !args.length) {
            return message.channel.send(`Tu n'as indiqué aucun argument, ${message.author}!`).then(msg => msg.delete({ timeout: 5000 }));
    }

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.log(`[ERROR] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.red("Une erreur s'est produite lors de l'exécution d'une commande."))
        console.error(error);
        message.reply('Une erreur est survenue lors de l\'exécution de cette commande !').then(msg => msg.delete({ timeout: 5000 }))
    }
});

client.on('guildMemberAdd', async member => {
    console.log(`[INFO] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.green(`${member.user.username} vient de rejoindre le serveur.`));
    const channel = client.channels.cache.get('659528441967804416');
    const nbedegens = channel.guild.memberCount;
    const nbedebots = channel.guild.roles.cache.get('658442658737291334').members.size;
    let total = nbedegens - nbedebots
    if (!channel) return;
    const chanamodif = client.channels.cache.get('775754356673740873');
    chanamodif.setName("👤 Membres : " + total)
    if(member.id === "690831638623420438"){
        return
    }
    const embed = new Discord.MessageEmbed()
        .setFooter(member.client.user.username, member.client.user.avatarURL())
        .setTimestamp()
        .setTitle(`Hey ${member.user.username} ! Bienvenue sur le serveur de TechLambda :tada::hugging: ! !`)
        .setDescription(`Nous sommes désormais ${total} sur le serveur !`)
        .setImage("https://media.giphy.com/media/3o7aDcS4fAE9gHUVkk/giphy.gif")
        .setColor("00ffff");
    channel.send(embed);
    member.roles.add('658439261372284958')
});

client.on('guildMemberRemove', async member => {
    const channel = client.channels.cache.get('659528441967804416');
    const nbedegens = channel.guild.memberCount;
    const nbedebots = channel.guild.roles.cache.get('658442658737291334').members.size;
    let total = nbedegens - nbedebots
    if (!channel) return;
    const chanamodif = client.channels.cache.get('775754356673740873');
    const byechannel = client.channels.cache.get('658438198996893768');
    chanamodif.setName("👤 Membres : " + total)
    console.log(`[INFO] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.green(`${member.user.username} vient de quitter le serveur.`));
    if(member.id === "690831638623420438"){
        return
    }
    byechannel.send(`Aïe... Coup dur pour ${member.user.username} qui a quitté le serveur :wave::disappointed_relieved:`);
});

client.on('messageReactionAdd', async (reaction, user) => {

    if (user.bot) return;

    if (!client.reactions.has(reaction.emoji.name)) return;

    const toreaction = client.reactions.get(reaction.emoji.name);

    try {
        toreaction.execute(reaction, user);
    } catch (error) { }

});

client.on('messageReactionRemove', async (reaction, user) => {

    if (user.bot) return;

    if (!client.rreactions.has(reaction.emoji.name)) return;

    const torreaction = client.rreactions.get(reaction.emoji.name);

    try {
        torreaction.execute(reaction, user);
    } catch (error) { }

});

client.login(token);
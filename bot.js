const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const raw = fs.readFileSync('config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.reactions = new Discord.Collection();
const reactionFiles = fs.readdirSync('./reactions').filter(file => file.endsWith('.js'));

client.rreactions = new Discord.Collection();
const rreactionFiles = fs.readdirSync('./r-reactions').filter(file => file.endsWith('.js'));

client.config = JSON.parse(raw);
client.queue = new Map();

let commandNumber = 0;
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    commandNumber++;
}
client.commandNumber = commandNumber
for (const file of reactionFiles) {
    const reaction = require(`./reactions/${file}`);
    client.reactions.set(reaction.name, reaction);
}
for (const file of rreactionFiles) {
    const rreaction = require(`./r-reactions/${file}`);
    client.rreactions.set(rreaction.name, rreaction);
}

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err); 
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); 
        if (eventFunction.disabled) return; 

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; 
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.execute(client, ...args, event));
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.login(client.config.token);
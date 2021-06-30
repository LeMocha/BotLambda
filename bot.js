const { Collection, Client } = require('discord.js');
const { logTime } = require('./utils/utils');
const { red } = require('chalk');
const fs = require('fs');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const raw = fs.readFileSync('config.json');
const disbut = require('discord-buttons')(client);

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.scommands = new Collection();
const scommandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

client.buttoncommand = new Collection();
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

client.config = JSON.parse(raw);
client.queue = new Map();

let commandNumber = 0;
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    commandNumber++;
}
client.commandNumber = commandNumber
for (const file of scommandFiles) {
    const scommand = require(`./slash-commands/${file}`);
    client.scommands.set(scommand.name, scommand);
}
for (const file of buttonFiles) {
    const bt = require(`./buttons/${file}`);
    client.buttoncommand.set(bt.name, bt);
}

client.musicinteraction = null

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err); 
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); 
        if (eventFunction.disabled) return; 

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; 
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.execute(client, ...args));
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
    if(interaction.type == 3) {

        const buttonName = interaction.data.custom_id;
    
        const buttoncommand = client.buttoncommand.get(buttonName)
        if (!buttoncommand) return;
    
        try {
            buttoncommand.execute(interaction, client)
        } catch (error) {
            console.log(`[ERROR] [${logTime()}]`, red("Une erreur s'est produite lors de l'exécution d'une commande."))
            console.error(error);
        }
        
    } else {

        const scommandName = interaction.data.name.toLowerCase();
    
        const scommand = client.scommands.get(scommandName)
        if (!scommand) return;
    
        try {
            scommand.execute(interaction, client)
        } catch (error) {
            console.log(`[ERROR] [${logTime()}]`, red("Une erreur s'est produite lors de l'exécution d'une commande."))
            console.error(error);
        }

    }
});

client.login(client.config.token);
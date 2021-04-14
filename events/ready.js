const chalk = require('chalk');
module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`[NODE] [${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}]`, chalk.blue(`Je suis connecté en tant que ${client.user.tag} et avec ${client.commandNumber} commandes !`));
        client.user.setActivity("Oncle Lambda et Papa Mocha", { type: 'LISTENING' });
    }
};
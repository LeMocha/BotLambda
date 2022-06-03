module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Je suis connecté en tant que ${client.user.tag} !`);
	},
};
module.exports = {
    name: 'acebug',
    description: 'Je ne sais pas quoi mettre ici',
    args: false,
    guildOnly: false,
    usage: "Aucun Usage",
    category: "fun",
    execute(message) {
        message.delete()
        message.channel.send("**SIGNEZ LA PETITION !!!** https://secure.avaaz.org/community_petitions/fr/la_communaute_faire_en_sorte_que_techlambda_ai_les_1k_avant_2022/?wLsvarb&utm_source=sharetools&utm_medium=twitter&utm_campaign=petition-1070383-faire_en_sorte_que_techlambda_ai_les_1k_avant_2022&utm_term=Lsvarb%2Bfr");
    },
};
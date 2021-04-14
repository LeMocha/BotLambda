const Discord = require('discord.js');

module.exports = {
    name: 'vaporwave',
    description: 'Pour écrire un texte autrement x)',
    args: true,
    guildOnly: false,
    usage: "<texte que tu veux me faire dire>",
    category: "fun",
    execute(message, args) {
        
        message.delete();

        let normal = ' 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&()*+,-./:;<=>?@[\\]^_{|}~';
        let wide = '　０１２３４５６７８９ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ！゛＃＄％＆（）＊＋、ー。／：；〈＝〉？＠［\\］＾＿｛｜｝～';

        let text = args.join(' ');

        for (let i = 0; i < normal.length; i++) {
            const char = normal[i];
            text = text.split(char).join(wide[i]);
        }

        const embed = new Discord.MessageEmbed()
            .setFooter(`${message.author.username}`, message.author.avatarURL())
            .setDescription(text)
            .setColor("00ffff");
        return message.channel.send(embed)
    },
};
module.exports = {
    name: 'vaporwave',
    description: 'Pour écrire un texte autrement x)',
    args: true,
    guildOnly: false,
    aliases:['vpw'],
    usage: "<message>",
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

        return message.channel.send({embed: {
            color: "00ffff",
            description: text,
            timestamp: new Date(),
            footer: {
                text: `Lancé par ${message.author.username}`,
                icon_url: message.client.user.avatarURL(),
            },
        }})
    },
};
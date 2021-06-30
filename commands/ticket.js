module.exports = {
  name: 'ticket',
  description: 'Message pour obtenir des rôles spécifiques.',
  args: false,
  guildOnly: false,
  aliases:['tck'],
  usage: "",
  category: "pv",
  async execute(message) {
    message.delete();

    await message.channel.send({
      content: `**Besoin de contacter le service tech-nik ?** Vous pouvez ouvrir un ticket en appuyant sur la réaction ci-dessous.`,
      component:{
        "type": 2,
        "label": "Créer Ticket",
        "style": 2,
        "emoji": { "name": "🎫" },
        "custom_id": "ticket",
        "inline": true,
      }
    });
  },
};
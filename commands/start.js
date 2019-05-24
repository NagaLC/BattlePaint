const CtrlPlayer = require('./../controller/controllerPlayer');
const Discord = require('discord.js');

module.exports = {
    name: 'start',
    description: `Lance une partie de BattlePaint !`,
    args: false,
    aliases: ['on'],
    cooldown: 5,
    execute (message, args) {
        const client = message.client;
        client.players = new Discord.Collection();
        client.votes = new Discord.Collection();
        client.start = true;
        const embed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setTitle("PARTIE")
            .setDescription("ON");
        message.channel.send(embed);
    }
};
const CtrlPlayer = require('./../controller/controllerPlayer');
const Discord = require('discord.js');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'stop',
    description: `Arrete la partie en cours et affiche le gagnant.`,
    args: false,
    aliases: ['off'],
    cooldown: 5,
    execute (message, args) {
        const client = message.client;
        if (client.start === false) {
            message.reply(`Aucune partie en cours (voir la commande ${bloc}start${bloc}).`);
            return;
        }
        client.start = false;
        const { players } = message.client;
        const control = new CtrlPlayer(players);
        const embed = new Discord.RichEmbed()
            .setColor("RED")
            .setTitle("PARTIE")
            .setDescription("OFF")
            .setFooter("par " + message.author.username);        
        message.channel.send(embed);
        message.channel.send(control.winners());
    }
};
const CtrlPlayer = require('./../controller/controllerPlayer');
const Channel = require('./../utils/channel');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'list',
    description: `Liste les joueurs inscrits à la partie en cours.`,
    args: false,
    aliases: ['ls'],
    cooldown: 5,
    execute (message, args) {
        if (message.client.start === false) {
            message.reply(`Aucune partie en cours (voir la commande ${bloc}start${bloc}).`);
            return;
        }
        if(!Channel.isBattlePaint(message.guild, message.channel)) {
            message.reply(`La partie a lieu dans le channel battle-paint.`);
            return;
        }
        const { players } = message.client;
        const control = new CtrlPlayer(players);
        message.channel.send(control.listAll());
    }
};
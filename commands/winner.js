const CtrlPlayer = require('./../controller/controllerPlayer');
const Channel = require('./../utils/channel');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'winner',
    description: `Affiche le(s) joueur(s) gagnant(s) actuellement.`,
    args: false,
    aliases: ['win', 'winners', 'w'],
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
        message.channel.send(control.winners());
    }
};
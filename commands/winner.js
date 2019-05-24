const CtrlPlayer = require('./../controller/controllerPlayer');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'winner',
    description: `Affiche le(s) joueur(s) gagnant(s) actuellement.`,
    args: false,
    aliases: ['win', 'winners', 'w'],
    cooldown: 5,
    execute (message, args) {
        const client = message.client;
        if (client.start === false) {
            message.reply(`Aucune partie en cours (voir la commande ${bloc}start${bloc}).`);
            return;
        }
        const { players } = message.client;
        const control = new CtrlPlayer(players);
        message.channel.send(control.winners());
    }
};
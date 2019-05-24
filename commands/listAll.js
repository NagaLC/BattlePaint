const CtrlPlayer = require('./../controller/controllerPlayer');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'list',
    description: `Liste les joueurs inscrits à la partie en cours.`,
    args: false,
    aliases: ['ls'],
    cooldown: 5,
    execute (message, args) {
        const client = message.client;
        if (client.start === false) {
            message.reply(`Aucune partie en cours (voir la commande ${bloc}start${bloc}).`);
            return;
        }
        const { players } = message.client;
        const control = new CtrlPlayer(players);
        message.channel.send(control.listAll());
    }
};
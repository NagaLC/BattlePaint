const CtrlPlayer = require('./../controller/controllerPlayer');
const Role = require('./../utils/role');
const Channel = require('./../utils/channel');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'leave',
    description: `Quitter la partie.`,
    args: false,
    aliases: ['wesh'],
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
        control.leave(message.author, (err, msg) => {
            if(!err) {
                Role.unsetPlayer(message.guild, message.member);
            }
            message.channel.send(msg); 
        });
    }
};
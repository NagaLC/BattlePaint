const CtrlPlayer = require('./../controller/controllerPlayer');
const Role = require('./../utils/role');
const Channel = require('./../utils/channel');
const bloc = String.fromCharCode(96);
const encapsulation = bloc + bloc + bloc;

module.exports = {
    name: 'hello',
    description: `Dis coucou !`,
    args: false,
    aliases: ['bonjour'],
    cooldown: 5,
    execute (message, args) {
        message.reply(`${encapsulation}Bonjour, je suis BattlePaint. Je suis un bot intelligent, encore en cours de développement. Tu peux accéder à la liste de mes commandes via !help${encapsulation}`);
    }
};
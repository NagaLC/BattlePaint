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
        const author = message.author.username;
        message.author.send('FDP !');
        message.channel.send(`${author} aime les bonnes grosses queues.`);
    }
};

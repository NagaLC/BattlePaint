const CtrlPlayer = require('./../controller/controllerPlayer');
const Discord = require('discord.js');
const Role = require('./../utils/role');
const Channel = require('./../utils/channel');
const bloc = String.fromCharCode(96);

module.exports = {
    name: 'start',
    description: `Lance une partie de BattlePaint !`,
    args: false,
    aliases: ['on'],
    cooldown: 5,
    execute (message, args) {
        const client = message.client;

        // Test if a game is started
        if (client.start === true) {
            message.reply(`Une partie est déjà en cours (voir la commande ${bloc}stop${bloc}).`);
            return;
        }

        // Create the channel where the game is
        const paintChan = Channel.create(message.guild);
        if(!paintChan.created) {
           
        } else {

        }

        // Create roles, and add master to the executer
        const m_master = message.member;
        const master = Role.create(message.guild, "Master", "RED");
        if(!master.created) {
            // if the role does exist, then catch it and set the role
            m_master.addRole(master.role.id)
            .then("role ajouté")
            .catch(console.error);
        } else {
            // if the role doesn't exist, then catch the promise and set the role with then().
            master.role.then(r_master => {
                m_master.addRole(r_master.id)
                .then("role ajouté")
                .catch(console.error);
            });
        }

        // We do not need to set player to someone, the join command do the job
        // but in the start we know that player have been created
        const player = Role.create(message.guild, "Player","GREEN");

        // We need to set noob to all the members of the guild
        // Noobs are allowed to vote in the channel we had created
        const members = message.guild.members;
        const noob = Role.create(message.guild, "Xx_N0ob_xX", "BLACK");
        if(!noob.created) {
            members.forEach((member, id) => {
                if(member.id !== m_master.id) {
                    member.addRole(noob.role.id)
                    .then("role noob ajouté")
                    .catch(console.error);
                }
           });
        } else {
            noob.role.then(r_noob => {
                members.forEach((member, id) => {
                    // test if the member isn't the master
                    if(member.id !== m_master.id) {
                        member.addRole(r_noob.id)
                        .then("role noob ajouté")
                        .catch(console.error);
                    }
                });
            });
        }       

        client.players = new Discord.Collection();
        client.votes = new Discord.Collection();
        client.start = true;
        const embed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setTitle("PARTIE")
            .setDescription("ON")
            .setFooter(`La partie a lieu dans ${bloc}#battle-paint${bloc}`);

        message.channel.send(embed);
    }
};
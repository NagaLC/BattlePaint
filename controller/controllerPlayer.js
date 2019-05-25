const Discord = require('discord.js');
const Player = require('./../model/player');

module.exports = class ControllerPlayer {

	constructor(players) {
		if(players === undefined) {
			this.players = new Discord.Collection();
		} else {
			this.players = players;
		}
	}

	vote(user, callback) {
		const player = this.players.get(user.id);
        if (!player) {
            callback(true,`${user.username} n'est pas dans la liste des joueurs.`);
        } else {
        	player.vote++;
        	const embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle(user.username)
            .setDescription("Gagne un vote et en a maintenant " + player.vote);
            callback(false, embed);
        }
	}

	// Add player from the Class User of discord.js library
	add(user, callback) {
		const player = new Player(user);
		const save_length = this.players.length;
		this.players.set(user.id, player);
		const error = save_length > this.players.length;
		const message = error ? "Partie non rejoint." : "Partie rejoint.";
		const embed = new Discord.RichEmbed()
            .setColor("GREEN")
            .setTitle(user.username)
            .setDescription(message);
		callback(error, embed);
		
	}

	leave(user, callback) {
		const player = this.players.get(user.id);
        if (!player) {
            const msg = "Tu n'es pas dans la partie en cours.";
            callback(false, msg);
        } else {
        	const error = !this.players.delete(user.id);
			const message = error ? "Partie non quittée." : `a quitté la partie, honte à toi et tes dessins.`;
        	const embed = new Discord.RichEmbed()
            .setColor("RED")
            .setTitle(user.username)
            .setDescription(message);
			callback(error, embed);
        }
	}

	listAll() {
		let embed = new Discord.RichEmbed()
            .setColor("NAVY")
            .setTitle("Liste des joueurs"); 
		let players = this.players.array();
		if(players.length<=0) {
			return "Pas de joueurs dans la partie en cours.";
		}
		for (var i = 0; i < players.length; i++) {
			embed.addField(players[i].user.username,players[i].vote);
		}
		return embed;
	}

	list(arrayPlayers) {
		let embed = new Discord.RichEmbed()
            .setColor("GOLD")
            .setTitle("Gagnant(s)"); 
		let players = arrayPlayers;
		if(players.length<=0) {
			return "Pas de joueurs dans la partie en cours.";
		}
		for (var i = 0; i < players.length; i++) {
			embed.addField(players[i].user.username,players[i].vote);
		}
		return embed;
	}

	winners() {
		let players = this.players.array();
		let max = 0;
		players.forEach((player, id) => {
			max = player.vote > max ? player.vote : max;
		});
		let winners = [];
		players.forEach((player, id) => {
			if (player.vote === max) {
				winners.push(player);
			}
		});
		return this.list(winners);
	}

};
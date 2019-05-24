const { prefix, token } = require('./config.json');
const fs = require('fs');
const Discord = require('discord.js');

// Init. 
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.start = false;
client.players = new Discord.Collection();
client.votes = new Discord.Collection();

// Load differents commands from the commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
// Collection to manage cooldowns of commands
const cooldowns = new Discord.Collection();

client.on('ready', () => {
	client.user.setActivity('Paint', { type: 'PLAYING' });
});

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `Vous n'avez pas passé d'arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nL'utilisation de la commande est : \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Stp attends ${timeLeft.toFixed(1)} secondes avant de réutiliser la commande \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Il y a eu une erreur, veuillez contacter le développeur.');
	}
});
client.login(token);
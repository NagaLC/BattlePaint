function getChannel(guild, name) {
	const channels = guild.channels;
	let return_channel = undefined;
	channels.forEach((channel, id) => {
		if (channel.name === name) {
			return_channel = channel;
		}
	});
	return return_channel;
}

module.exports = class Channel {

	// channel from discord.js library
	static create(guild) {
		const res = {
			created : false,
			channel : undefined
		}

		// Test if role already exists
		let existingChannel = getChannel(guild, "battle-paint");
		if (existingChannel) {
			res.created = false;
			res.channel = existingChannel;
			return res;
		}

		const promise = guild.createChannel("battle-paint", {
			type : 'text'
		})
		.then(channel => {
			return channel;
		})
		.catch(console.error);	

		res.created = true;
		res.channel = promise;
		return res;
	}

	static remove(role) {
		return true;
	}

	static isBattlePaint(guild, channel) {
		let chan = getChannel(guild, "battle-paint");
		if (!chan) {
			return false;
		}
		return channel.id === chan.id;
	}

};
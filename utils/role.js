function listRoles(guild, name) {
	const roles = guild.roles;
	let existingRole = undefined;
	roles.forEach((role, id) => {
		if (role.name === name) {
			existingRole = role;
		}
	});
	return existingRole;
}

module.exports = class Role {

	// guild from discord.js library
	static create(guild, name, color) {

		const res = {
			created : false,
			role : undefined
		}

		// Test if role already exists
		let existingRole = listRoles(guild, name);
		if (existingRole) {
			res.created = false;
			res.role = existingRole;
			return res;
		}

		const promise = guild.createRole({
			name : name,
			color : color
		})
		.then(role => {
			return role;
		})
		.catch(console.error);	

		res.created = true;
		res.role = promise;
		return res;
	}

	static setPlayer(guild, member) {
		const r_player = listRoles(guild, "Player");
		if(r_player) {
			member.addRole(r_player.id)
            .then(console.log(`Role ${r_player.name} ajouté.`))
            .catch(console.error);
		}
	}

	static unsetPlayer(guild, member) {
		const r_player = listRoles(guild, "Player");
		if(r_player) {
			member.removeRole(r_player.id)
            .then(console.log(`Role ${r_player.name} retiré.`))
            .catch(console.error);
		}
	}

	static remove(guild, name) {
		
		const role = listRoles(guild, name);
		if(role) {
			role.delete()
			.then(deleted => console.log(`Role ${deleted.name} supprimé.`))
  			.catch(console.error);
		}

	}

	static isMaster(guild, member) {
		const r_master = listRoles(guild, "Master");
		if(!r_master) {
			return false;
		}
		let hasMaster = false;
		member.roles.forEach((role, id) => {
			if(role.id == r_master.id) {
				hasMaster = true;
			}
		});
		return hasMaster;
	}

};
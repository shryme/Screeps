module.exports = function (creep) {

	//Destroy the source keeper and tell everyone it's done once it is
	var sourceDistance = creep.pos.getRangeTo(Game.spawns.Spawn1.memory.sourceKeeperPos);

	var isMoving = sourceDistance >= 0 ? true : false;

	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
	if (targets.length > 0) {
		if (targets[0].hits > 100) {
			creep.rangedAttack(targets[0]);
			// Game.spawns.Spawn1.memory.keeper_neutralized = false;
		}
		else {
			// Game.spawns.Spawn1.memory.keeper_neutralized = true;
		}
	}
	else {
		//Move towards the source keeper
		if (isMoving) {
			//TODO detect when destroyer is in the way for harvesting
			creep.moveTo(Game.spawns.Spawn1.memory.sourceKeeperPos);
			// Game.spawns.Spawn1.memory.keeper_neutralized = false;
		}
		else {
			// Game.spawns.Spawn1.memory.keeper_neutralized = true;
		}
	}

}


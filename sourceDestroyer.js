module.exports = function (creep) {

	Game.spawns.Spawn1.memory.source_harvester_bypass = false;

	//Destroy the source keeper and tell everyone it's done once it is
	var sourceDistance = creep.pos.getRangeTo(Game.spawns.Spawn1.memory.sourceKeeperPos);
	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
	if (targets.length > 0) {
		if (targets[0].hits > 100) {
			creep.rangedAttack(targets[0]);
			Game.spawns.Spawn1.memory.source_harvester_bypass = false;
		}
		else
			Game.spawns.Spawn1.memory.source_harvester_bypass = true;
	}
	//Move towards the source keeper
	if (sourceDistance >= 0) {
		//TODO detect when destroyer is in the way for harvesting
		creep.moveTo(Game.spawns.Spawn1.memory.sourceKeeperPos);
	}

}


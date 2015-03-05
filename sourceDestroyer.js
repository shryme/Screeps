module.exports = function (creep) {

	var sourceDistance = creep.pos.getRangeTo(Game.spawns.Spawn1.memory.sourceKeeperPos);
	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
	if (targets.length > 0) {
		if (creep.getActiveBodyparts() > 1) {
			creep.rangedAttack(targets[0]);
			Game.spawns.Spawn1.memory.source_harvester_bypass = false;
		}
		else {
			Game.spawns.Spawn1.memory.source_harvester_bypass = true;
		}
	}
	if (sourceDistance > 3) {
		creep.moveTo(Game.spawns.Spawn1.memory.sourceKeeperPos);
	}

}

//spawn at 380
//Get there at 940
//560 to get there

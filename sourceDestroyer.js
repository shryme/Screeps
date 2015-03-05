module.exports = function (creep) {

	var sourceDistance = creep.pos.getRangeTo(Game.spawns.Spawn1.memory.sourceKeeperPos);
	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
	if (targets > 0) {
		creep.rangedAttack(targets[0]);
	}
	if (range > 3) {
		creep.moveTo(Game.spawns.Spawn1.memory.sourceKeeperPos);
	}

	// if (creep.pos.x !== creep.memory.toGo.x || creep.pos.y !== creep.memory.toGo.y) {
	// 	creep.moveTo(creep.memory.toGo);
	// }
	// else {
	// 	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
	// 	if(targets.length > 0) {
	// 		creep.rangedAttack(targets[0]);
	// 	}
	// }
}

//spawn at 380
//Get there at 940
//560 to get there

module.exports = function(creep) {

	if (creep.pos.x !== creep.memory.toGo.x || creep.pos.y !== creep.memory.toGo.y) {
		//Got to their designated position from memory
		creep.moveTo(creep.memory.toGo);
	}
	else {
		//start mining and transfert energy to the creep designated inside his memory
		var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
		creep.harvest(source);

		var found = creep.room.lookForAt('creep', creep.memory.toDrop);
		creep.transferEnergy(found);
	}

}
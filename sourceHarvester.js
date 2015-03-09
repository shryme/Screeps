module.exports = function (creep) {

	function harvest(creep) {
		var sourceKeeper = Game.spawns.Spawn1.memory.sourceKeeperPos;
		var pos = Game.spawns.Spawn1.room.getPositionAt(sourceKeeper.x, sourceKeeper.y);
		var source = pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
		var targets = pos.findInRange(Game.HOSTILE_CREEPS, 3);
		var ticks = Game.spawns.Spawn1.pos.findClosest(Game.HOSTILE_STRUCTURES).ticksToSpawn;
		//var lair = Game.flags.SK.pos.findClosest(Game.HOSTILE_STRUCTURES).ticksToSpawn;

		if (Game.spawns.Spawn1.memory.source_harvester_bypass === true || (targets.length === 0 && ticks > 40)) {
			creep.moveTo(source);
			creep.harvest(source);
		}
		else {
			creep.moveTo(46, 20);
		}
	}

	function build(creep) {
		var target = creep.pos.findClosest(Game.MY_STRUCTURES, {filter: function(object) {return object.structureType === Game.STRUCTURE_EXTENSION && object.energy < object.energyCapacity} });
		if (target) {
			creep.moveTo(target);
			creep.transferEnergy(target);
		}
		else {
			var targets = creep.room.find(Game.CONSTRUCTION_SITES);
			if(targets.length) {
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
			}
			else {
				creep.moveTo(Game.spawns.Spawn1);
				creep.transferEnergy(Game.spawns.Spawn1);
			}
		}
	}

	var isMining = false;
	var targets = creep.pos.findInRange(Game.SOURCES_ACTIVE, 1);

	if (targets.length > 0) {
		isMining = true;
	}

	if(creep.energy < creep.energyCapacity) {
		if (isMining || creep.energy === 0) {
			harvest(creep);
		}
		else {
			build(creep);
		}

	}
	else {
		if (creep.energy > 0)
			build(creep);
		else
			harvest(creep);
	}
}
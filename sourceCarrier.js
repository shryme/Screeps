module.exports = function (creep) {

	var sourceKeeper = Game.spawns.Spawn1.memory.sourceKeeperPos;
	var pos = Game.spawns.Spawn1.room.getPositionAt(sourceKeeper.x, sourceKeeper.y);
	var source = Game.spawns.Spawn1.pos.findClosest(Game.MY_CREEPS, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});

	

	if (Game.spawns.Spawn1.memory.keeper_neutralized === true) {

		if(creep.energy < creep.energyCapacity) {
			var harvester = Game.spawns.Spawn1.pos.findClosest(Game.MY_CREEPS, {
				filter: function(object) {
					return object.memory.role === 'source_harvester';
				}
			});
			creep.moveTo(harvester);

			var droppedEnergy = creep.pos.findClosest(Game.DROPPED_ENERGY);
			if(droppedEnergy)
				creep.pickup(droppedEnergy);
		}
		else {
			var res = creep.moveTo(Game.spawns.Spawn1);
			creep.transferEnergy(Game.spawns.Spawn1);

			if (res === Game.ERR_NO_PATH) {
				creep.say("I'm blocked :(");
			}
		}

	}
	else {
		if(creep.energy > 0) {
			creep.moveTo(Game.spawns.Spawn1);
			creep.transferEnergy(Game.spawns.Spawn1);
		}
		else
			creep.moveTo(46, 20);
	}
}

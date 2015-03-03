
module.exports = function (creep) {
  if(creep.energy == 0) {
		creep.moveTo(Game.spawns.Spawn1);
		if (Game.spawns.Spawn1.energy > 800)
		  Game.spawns.Spawn1.transferEnergy(creep);
	}
	else {
		var targets = creep.room.find(Game.CONSTRUCTION_SITES);
		if(targets.length) {
			creep.moveTo(targets[0]);
			creep.build(targets[0]);
		}
		else {
		  var target = creep.pos.findClosest(Game.STRUCTURE_EXTENSION, {filter: function(object) {return object.energy < object.energyCapacity} });
		  if (target) {
		    creep.moveTo(target);
		    creep.transferEnergy(target);
		  }
		}
	}
}
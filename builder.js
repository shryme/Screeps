
module.exports = function (creep) {
  if(creep.energy == 0) {
		creep.moveTo(Game.spawns.Spawn1);
		if (Game.spawns.Spawn1.energy > 800)
		  Game.spawns.Spawn1.transferEnergy(creep);
	}
	else {
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
		}
	}
}
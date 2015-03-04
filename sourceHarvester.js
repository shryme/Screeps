module.exports = function (creep) {

	if(creep.energy < creep.energyCapacity) {
	  if (Game.flags.SK) {
	    var source = Game.flags.SK.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
	    var targets = Game.flags.SK.pos.findInRange(Game.HOSTILE_CREEPS, 3);
      if(targets.length > 0) {
        creep.moveTo(46, 20);
      }
  		else {
  		  creep.moveTo(source);
  		  creep.harvest(source);
  		}
	  }
	}
	else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1)
  }
}
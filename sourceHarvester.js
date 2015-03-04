module.exports = function (creep) {

  function harvest(creep) {
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
  var targets = Game.flags.SK.pos.findInRange(Game.SOURCES_ACTIVE, 1);

  if (targets.length > 0) {
    isMining = true;
  }

	if(creep.energy < creep.energyCapacity) {
	  if (isMining) {
	    harvest(creep);
	  }
	  else {
	    build(creep);
	  }

	}
	else {
    build(creep);
  }
}
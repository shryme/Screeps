/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function (creep) {

	if(creep.energy < creep.energyCapacity) {

	  var source = creep.pos.findClosest(Game.SOURCES);

		creep.moveTo(source);
		creep.harvest(source);
	}
	else {
		creep.moveTo(Game.spawns.Spawn1);
		creep.transferEnergy(Game.spawns.Spawn1)
  }
}
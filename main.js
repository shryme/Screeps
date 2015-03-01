var harvester = require('harvester');
var road = require('road');

var harvesterNumbers = 0;
var builderNumbers = 0;
var guardNumbers = 0;
var healerNumbers = 0;

for(var name in Game.creeps) {
  var creep = Game.creeps[name];

	if(creep.memory.role == 'harvester') {
		harvester(creep);
		harvesterNumbers++;
	}
	else if(creep.memory.role == 'builder') {

		if(creep.energy == 0) {
			creep.moveTo(Game.spawns.Spawn1);
			if (Game.spawns.Spawn1.energy > 200)
			  Game.spawns.Spawn1.transferEnergy(creep);
		}
		else {
			var targets = creep.room.find(Game.CONSTRUCTION_SITES);
			if(targets.length) {
				creep.moveTo(targets[0]);
				creep.build(targets[0]);
			}
		}

		builderNumbers++;
	}
	else if(creep.memory.role == 'guard') {
    var targets = creep.room.find(Game.HOSTILE_CREEPS);
    if(targets.length) {
      creep.moveTo(targets[0]);
      creep.attack(targets[0]);
    }

    guardNumbers++;
  }
  else if (creep.memory.role == 'healer') {
    var target = creep.pos.findClosest(Game.MY_CREEPS, {
    filter: function(object) {
      return object.hits < object.hitsMax;
    }
    if (target) {
      creep.moveTo(targets);
      creep.heal(targets);
    }

    healerNumbers++;
});

if (builderNumbers < 1 && Game.spawns.Spawn1) {
  Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined, {role: 'builder'});
  road.buildClosestRoom(Game.spawns.Spawn1);
}

if (healerNumbers < 2 && Game.spawns.Spawn1) {
  Game.spawns.Spawn1.createCreep([Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE, Game.MOVE], undefined, {role: 'healer'});
}

if (guardNumbers < 2 && Game.spawns.Spawn1) {
  Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], undefined, {role: 'guard'});
}

if (harvesterNumbers < 3 && Game.spawns.Spawn1) {
  Game.spawns.Spawn1.createCreep([Game.WORK, Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
}



//Game.spawns.Spawn1.createCreep( 	[Game.WORK, Game.CARRY, Game.MOVE], 	'Worker1' );
//Game.spawns.Spawn1.createCreep( 	[Game.WORK, Game.CARRY, Game.MOVE], 	'Worker2' );
//Game.spawns.Spawn1.createCreep( 	[Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], 	'Builder1' );
//Memory.creeps.Worker1.role = 'harvester'; Memory.creeps.Worker2.role = 'harvester'; Memory.creeps.Builder1.role = 'builder';
//Game.spawns.Spawn1.createCreep( 	[Game.TOUGH, Game.ATTACK, Game.MOVE, Game.MOVE], 	'Guard1' );
//Game.creeps.Guard1.memory.role = 'guard';

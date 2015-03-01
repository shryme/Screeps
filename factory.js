
var listBus;
function isBusDone(nbHarvester, nbBus) {
  var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
  var path = Game.spawns.Spawn1.room.findPath(Game.spawns.Spawn1.pos, source.pos, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});

  /*for (var roomPos in path) {

  }*/

  if (nbHarvester < 0) {
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
  }
  else {
    if (nbBus < path.length - 1)
      Game.spawns.Spawn1.createCreep([Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
  }

  return false;

}

module.exports = {

  createRobotz: function(data) {

    if (isBusDone(data.lazy_harvesterNumbers, data.busNumbers)) {
      if (data.harvesterSmallestTimeToLive > 150) {
        if (data.builderNumbers < 0 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined, {role: 'builder'});
          road.buildClosestRoom(Game.spawns.Spawn1);
        }

        if (data.guardNumbers >= 2 && data.guardNumbers < 4 && Game.spawns.Spawn1) {
          //Game.spawns.Spawn1.createCreep([Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.MOVE], undefined, {role: 'sniper'});
        }

        if (data.guardNumbers >= 6 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.MOVE, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.ATTACK], undefined, {role: 'guard'});
        }

        if (data.healerNumbers >= 2 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.MOVE, Game.MOVE, Game.ATTACK, Game.ATTACK, Game.ATTACK], undefined, {role: 'guard'});
        }

        if (data.healerNumbers < 2 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.MOVE, Game.MOVE, Game.HEAL], undefined, {role: 'healer'});
        }

        if (data.guardNumbers < 2 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK], undefined, {role: 'guard'});
        }
      }
      else if (data.harvesterNumbers < 4 && Game.spawns.Spawn1) {
        Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
      }

      if (data.harvesterNumbers < 3 && Game.spawns.Spawn1) {
        Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
        //Game.spawns.Spawn1.createCreep([Game.WORK, Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
      }
    }
    else {



    }

  }

}
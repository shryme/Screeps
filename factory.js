
var listBus;

function getListOfOpenPos(currentList) {
  var newList = new Array();

  var listToFill = Game.spawns.Spawn1.memory.listBus;
  for (var i = 0; i < listToFill.length; i++) {

    var x = listToFill[i].toGo.x;
    var y = listToFill[i].toGo.y;

    var isUsed = false;
    for (var j = 0; j < currentList.length; j++) {
      if (currentList[j].toGo.x === x && currentList[j].toGo.y === y) {
        isUsed = true;
        break;
      }
    }

    if (!isUsed)
      newList.push(listToFill[i]);

  }
}

function isBusDone(nbHarvester, nbBus, listBus) {

  if (Game.spawns.Spawn1.memory.listBus === undefined) {
    var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
    Game.spawns.Spawn1.memory.path = Game.spawns.Spawn1.room.findPath(Game.spawns.Spawn1.pos, source.pos, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});

    var path = Game.spawns.Spawn1.memory.path;
    for (var i = 0; i < path.length; i++) {
      if (i === 0)
        Game.spawns.Spawn1.memory.lazy_harvester = {toGo: path[path.length - 2], toDrop: path[path.length - 3]};
      else {
        var currentPath = {toGo: path[path.length - 3 - i], toDrop: path[path.length - 4 - i]}
        Game.spawns.Spawn1.memory.listBus.push(currentPath);
      }

    }

  }

  var listNewPos = getListOfOpenPos(listBus);

  /*for (var roomPos in path) {

  }*/

  if (nbHarvester < 1) {
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined,
      {role: 'lazy_harvester', toGo: Game.spawns.Spawn1.memory.path[Game.spawns.Spawn1.memory.path.length - 2], toDrop: Game.spawns.Spawn1.memory.path[Game.spawns.Spawn1.memory.path.length - 3]}); //160
  }
  else if (listNewPos.length > 0) {
    Game.spawns.Spawn1.createCreep([Game.CARRY, Game.MOVE], undefined,
      {role: 'bus', toGo: listNewPos[0].toGo, toDrop: listNewPos[0].toDrop}); //100
  }
  /*else if (nbBus < path.length - 2) {
      Game.spawns.Spawn1.createCreep([Game.CARRY, Game.MOVE], undefined,
      {role: 'bus', toGo: path[path.length - 3 - nbBus], toDrop: path[path.length - 4 - nbBus]}); //100
  }*/
  else {
    if (Game.spawns.Spawn1.energy > 340 + 160 + 100 * path.length - 2)
      return true;
  }

  return false;

}

module.exports = {

  createRobotz: function(data) {

    if (isBusDone(data.lazy_harvesterNumbers, data.busNumbers, data.listBus)) {
      //if (data.harvesterSmallestTimeToLive > 150) {
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
      //}
      /*else if (data.harvesterNumbers < 4 && Game.spawns.Spawn1) {
        Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
      }

      if (data.harvesterNumbers < 3 && Game.spawns.Spawn1) {
        Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.CARRY, Game.CARRY, Game.MOVE], undefined, {role: 'harvester'});
      }*/
    }

  }

}
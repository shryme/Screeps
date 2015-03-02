
var listBus;

function getListOfOpenPos(type, currentList) {
  var newList = new Array();

  var listToFill;
  if (type === 'bus')
    listToFill = Game.spawns.Spawn1.memory.listBus;
  else
    listToFill = Game.spawns.Spawn1.memory.listHarvester;

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

  return newList;
}

function isBusDone(nbHarvester, nbBus, listBus, listHarvester) {

  if (Game.spawns.Spawn1.memory.listBus === undefined) {
    Game.spawns.Spawn1.memory.listBus = new Array();
    Game.spawns.Spawn1.memory.listHarvester = new Array();
    var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
    Game.spawns.Spawn1.memory.path = Game.spawns.Spawn1.room.findPath(Game.spawns.Spawn1.pos, source.pos, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});

    var path = Game.spawns.Spawn1.memory.path;
    Game.spawns.Spawn1.memory.lazy_harvester = new Array();
    for (var i = 0; i < path.length - 1; i++) {
      if (i === 0) {
        Game.spawns.Spawn1.memory.listHarvester.push({toGo: {x: path[path.length - 2].x, y: path[path.length - 2].y - 1}, toDrop: path[path.length - 3]});
        Game.spawns.Spawn1.memory.listHarvester.push({toGo: path[path.length - 2], toDrop: path[path.length - 3]});
      }
      else {
        var currentPath = {toGo: path[path.length - 2 - i], toDrop: path[path.length - 3 - i]}
        Game.spawns.Spawn1.memory.listBus.push(currentPath);
      }

    }

  }

  var listNewPos = getListOfOpenPos('bus', listBus);
  var listNewHarvesterPos = getListOfOpenPos('harverster', listHarvester);

  if (nbHarvester < 1) {
    console.log(Game.spawns.Spawn1.memory.lazy_harvester);
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined,
      {role: 'lazy_harvester', toGo: listNewHarvesterPos[0].toGo, toDrop: listNewHarvesterPos[0].toDrop}); //160
  }
  else if (listNewPos !== undefined && listNewPos.length > 0) {
    Game.spawns.Spawn1.createCreep([Game.CARRY, Game.MOVE], undefined,
      {role: 'bus', toGo: listNewPos[0].toGo, toDrop: listNewPos[0].toDrop}); //100
  }
  else if (nbHarvester < 2) {
    Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined,
      {role: 'lazy_harvester', toGo: listNewHarvesterPos[0].toGo, toDrop: listNewHarvesterPos[0].toDrop}); //160
  }
  else {
    if (Game.spawns.Spawn1.energy > 340 + 160 + 100 * Game.spawns.Spawn1.memory.path.length - 2)
      return true;
  }

  return false;

}

module.exports = {

  createRobotz: function(data) {

    if (isBusDone(data.lazy_harvesterNumbers, data.busNumbers, data.listBus, data.listHarvester)) {

        if (data.guardNumbers >= 6 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.ATTACK], undefined, {role: 'guard'});
        }

        if (data.healerNumbers >= 2 && data.guardNumbers < 6 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.MOVE, Game.MOVE, Game.ATTACK, Game.ATTACK, Game.ATTACK], undefined, {role: 'guard'});
        }

        if (data.healerNumbers < 3 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.MOVE, Game.MOVE, Game.HEAL], undefined, {role: 'healer'});
        }

        if (data.guardNumbers < 2 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK], undefined, {role: 'guard'});
        }
    }

  }

}
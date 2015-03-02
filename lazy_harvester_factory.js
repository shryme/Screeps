var listAllBus = Game.spawns.Spawn1.room.memory.listAllBus;
var listAllHarvester = Game.spawns.Spawn1.room.memory.listAllHarvester;

function getListOfOpenPos(type, currentList) {
  var newList = new Array();

  var listToFill;
  if (type === 'bus')
    listToFill = listAllBus;
  else
    listToFill = listAllHarvester;

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


module.exports = {


  isDone: function(nbHarvester, nbBus, listBus, listHarvester) {

    //Calculate the path to take to go to the nearest source
    if (listAllBus === undefined) {
      listAllBus = new Array();
      listAllHarvester = new Array();
      var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
      Game.spawns.Spawn1.memory.path = Game.spawns.Spawn1.room.findPath(Game.spawns.Spawn1.pos, source.pos, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});

      var path = Game.spawns.Spawn1.memory.path;
      for (var i = 0; i < path.length - 1; i++) {
        if (i === 0) {
          listAllHarvester.push({toGo: {x: path[path.length - 2].x, y: path[path.length - 2].y - 1}, toDrop: path[path.length - 3]});
          listAllHarvester.push({toGo: path[path.length - 2], toDrop: path[path.length - 3]});
        }
        else {
          var currentPath = {toGo: path[path.length - 2 - i], toDrop: path[path.length - 3 - i]}
          listAllBus.push(currentPath);
        }

      }

      Game.spawns.Spawn1.room.memory.listAllBus = listAllBus;
      Game.spawns.Spawn1.room.memory.listAllHarvester = listAllHarvester;

    }

    //Gets the positions that are currently open and that needs to be filled
    var listNewPos = getListOfOpenPos('bus', listBus);
    var listNewHarvesterPos = getListOfOpenPos('harverster', listHarvester);

    //First create the first harvester, then all the transporters, the the rest of the harvester
    if (nbHarvester < 1 && listNewHarvesterPos.length > 0) {
      Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined,
        {role: 'lazy_harvester', toGo: listNewHarvesterPos[0].toGo, toDrop: listNewHarvesterPos[0].toDrop}); //160
    }
    else if (listNewPos !== undefined && listNewPos.length > 0) {
      Game.spawns.Spawn1.createCreep([Game.CARRY, Game.MOVE], undefined,
        {role: 'bus', toGo: listNewPos[0].toGo, toDrop: listNewPos[0].toDrop}); //100
    }
    else if (listNewHarvesterPos.length > 0) {
      Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined,
        {role: 'lazy_harvester', toGo: listNewHarvesterPos[0].toGo, toDrop: listNewHarvesterPos[0].toDrop}); //160
    }
    else {
      if (Game.spawns.Spawn1.energy > 800 + 160 + 100 * Game.spawns.Spawn1.memory.path.length - 2)
        return true;
      var targets = Game.spawns.Spawn1.pos.findInRange(Game.HOSTILE_CREEPS, 8);
      if (targets.length > 0)
        return true;
    }

    return false;

  }

}

var lazyHarvesterFactory = require('lazy_harvester_factory');

var prices = {};
prices.move = 50;
prices.work = 20;
prices.carry = 50;
prices.attack = 80;
prices.ranged_attack = 150;
prices.heal = 200;
prices.tough = 20;


function getCost(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += prices[arr[i]];
  }

  return total;
}

function canSpawnUnit(arr) {
  var unit = getCost(arr);
  var harvester = getCost([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE]);
  var bus = getCost([Game.CARRY, Game.MOVE]);
  var allBus = bus * (Game.spawns.Spawn1.memory.path.length - 2);

  if (Game.spawns.Spawn1.energy > unit + harvester + allBus) {
    return true;
  }
  return false
}

function spawnWeakGuard() {
  var modules = [Game.TOUGH, Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.RANGED_ATTACK];
  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'guard'});
}

function spawnWeakBuilder() {
  var modules = [Game.CARRY, Game.CARRY, Game.WORK, Game.WORK, Game.MOVE];
  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'builder'});
}

function spawnWeakHealer() {
  var modules = [Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE];
  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'healer'});
}

function spawnExtensionGuard(pieces) {
  if (canSpawnUnit(pieces))
    Game.spawns.Spawn1.createCreep(pieces, undefined, {role: 'guard'});
}

function spawnToughGuard() {
  var modules = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.MOVE, Game.MOVE, Game.ATTACK, Game.ATTACK, Game.ATTACK];
  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'guard'});
}

function spawnMediumGuard() {
  var modules = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.ATTACK];
  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'guard'});
}

var sourceDestroyerPosition = {x: 45, y: 26};

var listSourceHealer = new Array();
listSourceHealer.push({x: 45, y: 25});
listSourceHealer.push({x: 46, y: 25});

function getListOfOpenPos(list) {
  var newList = new Array();

  for (var i = 0; i < listSourceHealer.length; i++) {

    var x = listSourceHealer[i].x;
    var y = listSourceHealer[i].y;

    var isUsed = false;
    for (var j = 0; j < list.length; j++) {
      if (list[j].toGo.x === x && list[j].toGo.y === y) {
        isUsed = true;
        break;
      }
    }

    if (!isUsed)
      newList.push(listSourceHealer[i]);
  }

  return newList;
}

function spawnSourceHealer(list) {
  var modules = [Game.HEAL, Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE];

  var listPos = getListOfOpenPos(list);

  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'source_healer', toGo: listPos[0]});
}

function spawnSourceDestroyer() {
  var modules = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH,Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE];
  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'source_destroyer', toGo: sourceDestroyerPosition});
}

function spawnSourceHarvester() {
  var modules = [Game.WORK, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE];
  if (canSpawnUnit(modules))
    Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'source_harvester'});
}

module.exports = {

  createRobotz: function(data) {

    if (lazyHarvesterFactory.isDone(data.lazy_harvesterNumbers, data.busNumbers, data.listBus, data.listHarvester)) {

      /*var targets = Game.spawns.Spawn1.pos.findInRange(Game.HOSTILE_CREEPS, 8);
      if (targets.length > 0) {

      }*/

      /*if (data.guardNumbers >= 8 && Game.spawns.Spawn1) {
        Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK], undefined, {role: 'guard'});
      }*/

      //1950 source keeper die, revive 2100

      var extNumbers = Game.spawns.Spawn1.room.find(Game.MY_STRUCTURES, {filter: function(object) {return object.structureType === Game.STRUCTURE_EXTENSION && object.energy === object.energyCapacity} }).length;

      if (data.guardNumbers < 2) {
        spawnWeakGuard();
      }
      else if (data.sourceDestroyerNumbers < 1 || (factoryData.destroyerRefresh && data.sourceDestroyerNumbers < 2)) {
        spawnSourceDestroyer();
      }
      else if (data.sourceHealerNumbers < 2) {
        spawnSourceHealer(data.listSourceHealer);
      }
      else if (Game.spawns.Spawn1.room.find(Game.CONSTRUCTION_SITES).length > 0 && data.builderNumbers === 0 || data.builderNumbers === 0 && extNumbers > 0) {
        spawnWeakBuilder();
      }
      else if (data.healerNumbers < 2 && Game.spawns.Spawn1) {
        spawnWeakHealer();
      }
      else if (data.sourceHarvesterNumbers < 4) {
        spawnSourceHarvester();
      }
      else if (extNumbers > 0) {
        var pieces = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE, Game.MOVE];
        for (var i = 0; i < extNumbers; i++)
          pieces.push(Game.ATTACK);
        spawnExtensionGuard(pieces);
      }
      else if (data.healerNumbers >= 2 && data.guardNumbers < 10 && Game.spawns.Spawn1) {
        spawnToughGuard();
      }
      else if (data.guardNumbers >= 10 && Game.spawns.Spawn1) {
        spawnMediumGuard();
      }


    }

  }

}
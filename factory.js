
var lazyHarvesterFactory = require('lazy_harvester_factory');

var prices = {};
prices.MOVE = 50;
prices.WORK = 20;
prices.CARRY = 50;
prices.ATTACK = 80;
prices.RANGED_ATTACK = 150;
prices.HEAL = 200;
prices.TOUGH = 20;


function getCost(arr) {
  var total = 0;
  for (var module in arr) {
    total += prices[module];
  }

  return total;
}

function canSpawnUnit(arr) {
  var unit = getCost(arr);
  var harvester = getCost([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE]);
  var bus = getCost([Game.CARRY, Game.MOVE]);
  var allBus = bus * Game.spawns.Spawn1.memory.path.length - 2;

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

      if (data.guardNumbers >= 10 && Game.spawns.Spawn1) {
        spawnMediumGuard();
      }

      if (data.healerNumbers >= 2 && data.guardNumbers < 10 && Game.spawns.Spawn1) {
        spawnToughGuard();
      }

      var extNumbers = Game.spawns.Spawn1.room.find(Game.MY_STRUCTURES, {filter: function(object) {return object.structureType === Game.STRUCTURE_EXTENSION && object.energy === object.energyCapacity} }).length;
      if (extNumbers > 0) {
        var pieces = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE, Game.MOVE];
        for (var i = 0; i < extNumbers; i++)
          pieces.push(Game.ATTACK);
        spawnExtensionGuard(pieces);
      }

      if (data.healerNumbers < 2 && Game.spawns.Spawn1) {
        spawnWeakHealer();
      }

      var listConstructions = Game.spawns.Spawn1.room.find(Game.CONSTRUCTION_SITES);
      if (listConstructions.length > 0 && data.builderNumbers === 0 || data.builderNumbers === 0 && extNumbers > 0) {
        spawnWeakBuilder();
      }

      if (data.guardNumbers < 2 && Game.spawns.Spawn1) {
        spawnWeakGuard();
      }
    }

  }

}
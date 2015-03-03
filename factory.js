
var lazyHarvesterFactory = require('lazy_harvester_factory');

module.exports = {

  createRobotz: function(data) {

    if (lazyHarvesterFactory.isDone(data.lazy_harvesterNumbers, data.busNumbers, data.listBus, data.listHarvester)) {

        /*if (data.guardNumbers >= 8 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK], undefined, {role: 'guard'});
        }*/

        //1950 source keeper die, revive 2100

        if (data.guardNumbers >= 6 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.ATTACK], undefined, {role: 'guard'});
        }

        if (data.healerNumbers >= 2 && data.guardNumbers < 6 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.MOVE, Game.MOVE, Game.ATTACK, Game.ATTACK, Game.ATTACK], undefined, {role: 'guard'});
        }

        if (data.healerNumbers < 2 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.TOUGH, Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE], undefined, {role: 'healer'});
        }

        var listConstructions = Game.spawns.Spawn1.room.find(Game.CONSTRUCTION_SITES);
        if (listConstructions.length > 0 && data.builderNumbers === 0) {
          Game.spawns.Spawn1.createCreep([Game.CARRY, Game.CARRY, Game.CARRY, Game.WORK, Game.MOVE], undefined, {role: 'builder'});
        }

        if (data.guardNumbers < 2 && Game.spawns.Spawn1) {
          Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.RANGED_ATTACK], undefined, {role: 'guard'});
        }
    }

  }

}
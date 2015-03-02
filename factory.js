
var lazyHarvesterFactory = require('lazy_harvesterF_fctory');

module.exports = {

  createRobotz: function(data) {

    if (lazyHarvesterFactory.isDone(data.lazy_harvesterNumbers, data.busNumbers, data.listBus, data.listHarvester)) {

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
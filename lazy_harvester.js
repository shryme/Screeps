var Creep = require("Creep");

function LazyHarvester(creep) {
  Creep.call(this, creep);
}

module.exports = LazyHarvester;

LazyHarvester.prototype = Object.create(Creep.prototype);

LazyHarvester.prototype.tick = function() {

  if (this.creep.pos.x !== this.creep.memory.toGo.x && this.creep.pos.y !== this.creep.memory.toGo) {
    this.creep.moveTo(creep.memory.toGo);
  }
  else {
    var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
    creep.harvest(source);
    //creep.transferEnergy(creep.memory.toDrop);

    var found = this.creep.room.lookForAt('creep', this.creep.memory.toDrop);
    this.creep.transferEnergy(found);
  }

}
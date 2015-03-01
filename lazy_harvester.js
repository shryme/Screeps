
module.exports = function (creep) {

  if (creep.pos.x !== creep.memory.toGo.x && creep.pos.y !== creep.memory.toGo) {
    creep.moveTo(creep.memory.toGo);
  }
  else {
    var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
    creep.harvest(source);
    creep.transferEnergy(creep.memory.toDrop);
  }

}
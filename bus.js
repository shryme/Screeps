
module.exports = function (creep) {
  if (creep.pos.x !== creep.memory.toGo.x && creep.pos.y !== creep.memory.toGo) {
    creep.moveTo(creep.memory.toGo);
  }
  else {
    var found = creep.room.lookForAt('creep', creep.memory.toDrop);
    if (found)
      creep.transferEnergy(found);
    else {
      found = creep.room.lookForAt('structure', creep.memory.toDrop);
      if (found) {
        creep.transferEnergy(found);
      }
      else if (creep.memory.toDrop === undefined) {
        creep.transferEnergy(Game.spawns.Spawn1);
      }
    }
  }
}
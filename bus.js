
module.exports = function (creep) {
  if (creep.pos.x !== creep.memory.toGo.x && creep.pos.y !== creep.memory.toGo) {
    creep.moveTo(creep.memory.toGo);
  }
  else {
    creep.transferEnergy(creep.memory.toDrop);
  }
}
module.exports = function (creep) {
  if (creep.pos.x !== creep.memory.toGo.x || creep.pos.y !== creep.memory.toGo.y) {
    creep.moveTo(creep.memory.toGo);
  }
  else {
    var tm = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'source_destroyer'} });
    if (tm)
      creep.heal(tm);
  }
}
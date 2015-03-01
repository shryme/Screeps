
module.exports = function (creep) {
  var target = creep.pos.findClosest(Game.HOSTILE_CREEPS);
  if(target) {
    creep.moveTo(target);
    creep.attack(target);
  }
  else {
    var tm;
    if (Game.flags.Flag1 !== undefined)
      tm = Game.flags.Flag1
    else
      tm = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'guard' && object.id !== creep.id} });
    if (tm) {
      creep.moveTo(tm);
    }
  }
}
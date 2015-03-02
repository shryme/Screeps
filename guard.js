
module.exports = function (creep) {


  var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 8);

  var target = creep.pos.findClosest(targets, {filter: function(object) {return object.owner.username !== 'Source Keeper'} });

  if (creep.getActiveBodyparts(Game.RANGED_ATTACK) > 0) {
    var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
    if(targets.length > 0) {
      creep.rangedMassAttack();
    }
  }

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

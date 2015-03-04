module.exports = function (creep) {

  var target = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.hits < object.hitsMax && object.id !== creep.id && object.memory.role !== 'source_destroyer';} });
  if (target) {

    if (creep.getActiveBodyparts(Game.HEAL) == 0 && Game.flags.Flag1 !== undefined)
      target = Game.flags.Flag1;
    //creep.say('HEAL');
    creep.moveTo(target);
    creep.heal(target);
  }
  else {
    var tm = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'guard'} });
    if (tm) {
      creep.moveTo(tm);
    }
  }

}
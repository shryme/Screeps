module.exports = function (creep) {

	var target;

	if (creep.memory.targetRole)
		target = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.hits < object.hitsMax && object.id !== creep.id && object.memory.role !== 'source_destroyer' && object.memory.role === creep.memory.targetRole;} });
	else
		target = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) 
			{return object.hits < object.hitsMax && object.id !== creep.id && object.memory.role !== 'source_destroyer' && object.memory.role !== 'source_harvester' && object.memory.role !== 'source_healer';} });
	if (target) {

		//If the healer have no more working healer module, stays at flag
		if (creep.getActiveBodyparts(Game.HEAL) == 0 && Game.flags.Flag1 !== undefined)
			target = Game.flags.Flag1;
		else {
			creep.moveTo(target);
			creep.heal(target);
		}
	}
	else {
		//If there is no one to heal, find the closest creep and follow it
		var tm
		if (creep.memory.targetRole)
			tm = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === creep.memory.targetRole} });
		else
			tm = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'guard'} });
		if (tm) {
			creep.moveTo(tm);
		}
	}

}
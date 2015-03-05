module.exports = function (creep) {

	// var target = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.hits < object.hitsMax && object.id !== creep.id && object.memory.role === 'source_destroyer';} });

	// if (!target)
	// 	target = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'source_destroyer'} });

	// if (target) {
	// 	creep.moveTo(target);
	// 	creep.heal(target);
	// }


	var sourceDestroyer = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'source_destroyer'} });
	if (sourceDestroyer) {
		if (Game.spawns.Spawn1.memory.source_harvester_bypass === false) {
			creep.moveTo(sourceDestroyer.pos.x, sourceDestroyer.pos.y - 1);
			creep.heal(sourceDestroyer);
		}
		else {
			creep.moveTo(sourceDestroyer.pos.x, sourceDestroyer.pos.y + 2);
			var target = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.hits < object.hitsMax && object.id !== creep.id;} });
			creep.heal(target);
		}
	}

	// if (creep.pos.x !== creep.memory.toGo.x || creep.pos.y !== creep.memory.toGo.y) {
	// 	creep.moveTo(creep.memory.toGo);
	// }
	// else {
	// 	var tm = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'source_destroyer'} });
	// 	if (tm)
	// 		creep.heal(tm);
	// }

}
module.exports = function (creep) {

	//Find the closest source_destroyer
	var sourceDestroyer = creep.pos.findClosest(Game.MY_CREEPS, {filter: function(object) {return object.memory.role === 'source_destroyer'} });
	if (sourceDestroyer) {
		if (Game.spawns.Spawn1.memory.keeper_neutralized === true) {
			//When the source destroyer is finished, move healer below it to start healing everything
			healLowestCreep(creep, sourceDestroyer);
		}
		else {
			//If the source destroyer is destroying the source keeper, let the source destroyer destroy the source keeper
			healSourceDestroyer(creep, sourceDestroyer);
		}
	}

}

function healSourceDestroyer(creep, sourceDestroyer) {
	if (creep.room.lookAt(sourceDestroyer.pos.x, sourceDestroyer.pos.y - 1).length === 1)
		creep.moveTo(sourceDestroyer.pos.x, sourceDestroyer.pos.y - 1);
	else
		creep.moveTo(sourceDestroyer.pos.x + 1, sourceDestroyer.pos.y - 1);
	creep.heal(sourceDestroyer);
}

function healLowestCreep(creep, sourceDestroyer) {

	if (creep.room.lookAt(sourceDestroyer.pos.x, sourceDestroyer.pos.y + 2).length === 1)
		creep.moveTo(sourceDestroyer.pos.x, sourceDestroyer.pos.y + 2);
	else
		creep.moveTo(sourceDestroyer.pos.x, sourceDestroyer.pos.y + 1);

	var targets = creep.pos.findInRange(Game.MY_CREEPS, 3);

	var lowestCreep;
	for (var i = 0; i < targets.length; i++) {
		if (targets[i].id !== creep.id && (lowestCreep === undefined || targets[i].hits < lowestCreep.hits))
			lowestCreep = targets[i];
	}

	if (lowestCreep) {
		var range = creep.pos.getRangeTo(lowestCreep);

		if (range > 1)
			creep.rangedHeal(lowestCreep);
		else
			creep.heal(lowestCreep);
	}
}
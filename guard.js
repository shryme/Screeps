
module.exports = function (creep) {

	//Find the closest target in the specified range
	var range = 8;
	if (creep.ticksToLive < 200)
		range = 30;
	var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, range);
	var target = creep.pos.findClosest(targets, {filter: function(object) {return object.owner.username !== 'Source Keeper'} });

	//If guard have ranged attack, use it !
	if (creep.getActiveBodyparts(Game.RANGED_ATTACK) > 0) {
		var targets = creep.pos.findInRange(Game.HOSTILE_CREEPS, 3);
		if(targets.length > 1) {
			//If more then 1 ennemy, use rangedMassAttack
			creep.rangedMassAttack();
		}
		else {
			//Else juste snipe it
			creep.rangedAttack(targets[0]);
		}
	}

	if(target) {
		//Then move and melee attack
		creep.moveTo(target);
		creep.attack(target);
	}
	else {
		//Once every enemy is destroyed, move to the Flag1
		//If there is none, stay close to the closest guard
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

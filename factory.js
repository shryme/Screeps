
//List of module prices
var prices = {};
prices.move = 50;
prices.work = 20;
prices.carry = 50;
prices.attack = 80;
prices.ranged_attack = 150;
prices.heal = 200;
prices.tough = 20;



//List of position to take for lazy harvester and bus
var listAllBus = Game.spawns.Spawn1.room.memory.listAllBus;
var listAllHarvester = Game.spawns.Spawn1.room.memory.listAllHarvester;

function getListOfOpenPosHarvester(type, currentList) {
	var newList = new Array();

	var listToFill;
	if (type === 'bus')
		listToFill = listAllBus;
	else
		listToFill = listAllHarvester;

	for (var i = 0; i < listToFill.length; i++) {

		var x = listToFill[i].toGo.x;
		var y = listToFill[i].toGo.y;

		var isUsed = false;
		for (var j = 0; j < currentList.length; j++) {
			if (currentList[j].toGo.x === x && currentList[j].toGo.y === y) {
				isUsed = true;
				break;
			}
		}

		if (!isUsed)
			newList.push(listToFill[i]);

	}

	return newList;
}


//Calculate cost and detect if it's fine to spawn a new creep
function getCost(arr) {
	var total = 0;
	for (var i = 0; i < arr.length; i++) {
		total += prices[arr[i]];
	}

	return total;
}

function canSpawnUnit(arr) {
	var unit = getCost(arr);
	var harvester = getCost([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE]);
	var bus = getCost([Game.CARRY, Game.MOVE]);
	var allBus = bus * (Game.spawns.Spawn1.memory.path.length - 2);

	if (Game.spawns.Spawn1.energy > unit + harvester + allBus) {
		return true;
	}
	return false
}

//Creation creep
function spawnWeakGuard() {
	var modules = [Game.TOUGH, Game.MOVE, Game.ATTACK, Game.MOVE, Game.ATTACK, Game.RANGED_ATTACK];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'guard'});
}

function spawnWeakBuilder() {
	var modules = [Game.CARRY, Game.CARRY, Game.WORK, Game.WORK, Game.MOVE];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'builder'});
}

function spawnWeakHealer(targetRole) {
	var modules = [Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE, Game.MOVE];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'healer', targetRole: targetRole});
}

function spawnExtensionGuard(pieces) {
	if (canSpawnUnit(pieces))
		Game.spawns.Spawn1.createCreep(pieces, undefined, {role: 'guard'});
}

function spawnToughGuard() {
	var modules = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.MOVE, Game.MOVE, Game.ATTACK, Game.ATTACK, Game.ATTACK];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'guard'});
}

function spawnMediumGuard() {
	var modules = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.ATTACK];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'guard'});
}

function spawnSourceHealer(list, isTemp) {
	var modules = [Game.HEAL, Game.HEAL, Game.HEAL, Game.HEAL, Game.MOVE];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'source_healer'});
}

function findClosestSourceKeeperSpot(from) {
	//Game.spawns.Spawn1.pos.findClosest(Game.HOSTILE_STRUCTURES).ticksToSpawn;

	if (Game.spawns.Spawn1.memory.sourceKeeperPos === undefined) {
		var lair = from.pos.findClosest(Game.HOSTILE_STRUCTURES);
		var sourceKeeper = lair.pos.findClosest(Game.HOSTILE_CREEPS);
		sourceKeeper.pos.x = sourceKeeper.pos.x + 1;
		Game.spawns.Spawn1.memory.sourceKeeperPos = sourceKeeper.pos;
	}

	return Game.spawns.Spawn1.memory.sourceKeeperPos;


}

function spawnSourceDestroyer() {
	var keeperPos = findClosestSourceKeeperSpot(Game.spawns.Spawn1);
	keeperPos.x = 45;
	keeperPos.y = 26;
	var modules = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH,Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'source_destroyer', targetPos: keeperPos});
}

function spawnSourceHarvester() {
	var modules = [Game.WORK, Game.CARRY, Game.MOVE, Game.CARRY, Game.MOVE];
	if (canSpawnUnit(modules))
		Game.spawns.Spawn1.createCreep(modules, undefined, {role: 'source_harvester'});
}

module.exports = {

	isDone: function(nbHarvester, nbBus, listBus, listHarvester) {

		//Calculate the path to take to go to the nearest source
		if (listAllBus === undefined) {
			listAllBus = new Array();
			listAllHarvester = new Array();
			var source = Game.spawns.Spawn1.pos.findClosest(Game.SOURCES_ACTIVE, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
			Game.spawns.Spawn1.memory.path = Game.spawns.Spawn1.room.findPath(Game.spawns.Spawn1.pos, source.pos, {maxOps: 3000, ignoreDestructibleStructures: true, ignoreCreeps: true});

			var path = Game.spawns.Spawn1.memory.path;
			for (var i = 0; i < path.length - 1; i++) {
				if (i === 0) {
					listAllHarvester.push({toGo: path[path.length - 2], toDrop: path[path.length - 3]});
					//TODO don't hardcode this part
					//TODO need to detect where to put second harvester
					listAllHarvester.push({toGo: {x: path[path.length - 2].x, y: path[path.length - 2].y - 1}, toDrop: path[path.length - 2]});
				}
				else {
					var currentPath = {toGo: path[path.length - 2 - i], toDrop: path[path.length - 3 - i]}
					listAllBus.push(currentPath);
				}

			}

			Game.spawns.Spawn1.room.memory.listAllBus = listAllBus;
			Game.spawns.Spawn1.room.memory.listAllHarvester = listAllHarvester;

		}

		//Gets the positions that are currently open and that needs to be filled
		var listNewPos = getListOfOpenPosHarvester('bus', listBus);
		var listNewHarvesterPos = getListOfOpenPosHarvester('harverster', listHarvester);

		//First create the first harvester, then all the transporters, then the rest of the harvester
		if (nbHarvester < 1 && listNewHarvesterPos.length > 0) {
			Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined,
				{role: 'lazy_harvester', toGo: listNewHarvesterPos[0].toGo, toDrop: listNewHarvesterPos[0].toDrop}); //160
		}
		else if (listNewPos !== undefined && listNewPos.length > 0) {
			Game.spawns.Spawn1.createCreep([Game.CARRY, Game.MOVE], undefined,
				{role: 'bus', toGo: listNewPos[0].toGo, toDrop: listNewPos[0].toDrop}); //100
		}
		else if (listNewHarvesterPos.length > 0) {
			Game.spawns.Spawn1.createCreep([Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], undefined,
				{role: 'lazy_harvester', toGo: listNewHarvesterPos[0].toGo, toDrop: listNewHarvesterPos[0].toDrop}); //160
		}
		else {
			return true
		}

		return false;

	},
	createRobotz: function(data) {

		if (this.isDone(data.lazy_harvesterNumbers, data.busNumbers, data.listBus, data.listHarvester)) {

			/*var targets = Game.spawns.Spawn1.pos.findInRange(Game.HOSTILE_CREEPS, 8);
			if (targets.length > 0) {

			}*/

			/*if (data.guardNumbers >= 8 && Game.spawns.Spawn1) {
				Game.spawns.Spawn1.createCreep([Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.RANGED_ATTACK, Game.MOVE, Game.RANGED_ATTACK], undefined, {role: 'guard'});
			}*/


			var extNumbers = Game.spawns.Spawn1.room.find(Game.MY_STRUCTURES, {filter: function(object) {return object.structureType === Game.STRUCTURE_EXTENSION && object.energy === object.energyCapacity} }).length;

			if (data.guardNumbers < 2) {
				spawnWeakGuard();
			}
			//TODO Upgrade the detection for when the spot is safe for harvesting before doing this
			//else if (data.sourceDestroyerNumbers < 1 || (data.destroyerRefresh && data.sourceDestroyerNumbers < 2)) {
			else if (data.sourceDestroyerNumbers < 1) {
				spawnSourceDestroyer();
			}
			//TODO Upgrade the detection for when the spot is safe for harvesting before doing this
			//else if (data.sourceHealerNumbers < 2 || (data.destroyerRefresh && data.sourceHealerNumbers < 3)) {
			else if (data.sourceHealerNumbers < 2) {
				spawnSourceHealer(data.listSourceHealer, data.destroyerRefresh);
			}
			else if (data.healerNumbers < 2 || data.needHealer === true) {
				spawnWeakHealer();
			}
			else if (data.sourceHarvesterNumbers < 3) {
				spawnSourceHarvester();
			}
			else if (extNumbers > 0) {
				var pieces = [Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.TOUGH, Game.ATTACK, Game.ATTACK, Game.MOVE, Game.MOVE, Game.MOVE];
				for (var i = 0; i < extNumbers; i++)
					pieces.push(Game.ATTACK);
				spawnExtensionGuard(pieces);
			}
			else if (data.healerNumbers >= 2 && data.guardNumbers < 10 && Game.spawns.Spawn1) {
				spawnToughGuard();
			}
			else if (data.guardNumbers >= 10 && Game.spawns.Spawn1) {
				spawnMediumGuard();
			}


		}

	}

}
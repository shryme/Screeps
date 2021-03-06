var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var sniper = require('sniper');
var healer = require('healer');
var lazy_harvester = require('lazy_harvester');
var bus = require('bus');
var sourceDestroyer = require('sourceDestroyer');
var sourceHealer = require('sourceHealer');
var sourceHarvester = require('sourceHarvester');
var sourceCarrier = require('sourceCarrier');

var factory = require('factory');

var road = require('road');

var factoryData = {};
factoryData.harvesterNumbers = 0;
factoryData.builderNumbers = 0;
factoryData.guardNumbers = 0;
factoryData.healerNumbers = 0;
factoryData.lazy_harvesterNumbers = 0;
factoryData.busNumbers = 0;
factoryData.sourceDestroyerNumbers = 0;
factoryData.sourceHealerNumbers = 0;
factoryData.sourceHarvesterNumbers = 0;
factoryData.sourceCarrierNumbers = 0;
factoryData.harvesterSmallestTimeToLive = undefined;
factoryData.needHealer = false;
factoryData.listHarvester = new Array();
factoryData.listBus = new Array();
factoryData.listSourceHealer = new Array();

function setStatusKeeper(spawn) {
	var lair = spawn.pos.findClosest(Game.HOSTILE_STRUCTURES);
	var target;
	
	if (lair && lair.pos) {
		var targets = lair.pos.findInRange(Game.HOSTILE_CREEPS, 3);
		if (targets)
			target = lair.pos.findClosest(targets);
	}
	

	if ((target && target.hits > 100) || (lair && lair.ticksToSpawn && lair.ticksToSpawn < 40))
		Game.spawns.Spawn1.memory.keeper_neutralized = false;
	else
		Game.spawns.Spawn1.memory.keeper_neutralized = true;

}

setStatusKeeper(Game.spawns.Spawn1);

for(var name in Game.creeps) {
	var creep = Game.creeps[name];

	if(creep.memory.role == 'harvester') {
		harvester(creep);
		factoryData.harvesterNumbers++;

		if (factoryData.harvesterSmallestTimeToLive === undefined || factoryData.harvesterSmallestTimeToLive > creep.ticksToLive)
			factoryData.harvesterSmallestTimeToLive = creep.ticksToLive;
	}
	else if(creep.memory.role === 'builder') {
		builder(creep);
		factoryData.builderNumbers++;
	}
	else if(creep.memory.role === 'guard') {
		guard(creep);
		factoryData.guardNumbers++;
	}
	else if(creep.memory.role === 'sniper') {

		sniper(creep);
		factoryData.guardNumbers++;
	}
	else if (creep.memory.role === 'healer') {
		healer(creep);
		factoryData.healerNumbers++;
		if (creep.getActiveBodyparts(Game.HEAL) == 0)
			factoryData.needHealer = true;
	}
	else if (creep.memory.role === 'lazy_harvester') {
		lazy_harvester(creep);
		factoryData.lazy_harvesterNumbers++;
		factoryData.listHarvester.push(creep.memory);
	}
	else if (creep.memory.role === 'bus') {
		bus(creep);
		factoryData.busNumbers++;
		factoryData.listBus.push(creep.memory);
	}
	else if (creep.memory.role === 'source_destroyer') {
		sourceDestroyer(creep);
		factoryData.sourceDestroyerNumbers++;
		if (creep.ticksToLive < 500)
			factoryData.destroyerRefresh = true;
	}
	else if (creep.memory.role === 'source_healer') {
		sourceHealer(creep);
		factoryData.sourceHealerNumbers++;
		factoryData.listSourceHealer.push(creep.memory);
	}
	else if (creep.memory.role === 'source_harvester') {
		sourceHarvester(creep);
		factoryData.sourceHarvesterNumbers++;
	}
	else if (creep.memory.role === 'source_carrier') {
		sourceCarrier(creep);
		factoryData.sourceCarrierNumbers++;
	}
}

if (factoryData.harvesterSmallestTimeToLive === undefined)
	factoryData.harvesterSmallestTimeToLive = 0;

factory.createRobotz(factoryData);

if (Game.flags.Wall1 !== undefined && Game.flags.Wall2)
	road.buildWallBetweenFlags(Game.flags.Wall1, Game.flags.Wall2);

if (Game.flags.Ext)
	road.buildExtensionFlags(Game.flags.Ext);

/*
As in, create a module that explicitly sets every memory object you use to blank, then in your main loop, call that module if Game.time == 1.
*/
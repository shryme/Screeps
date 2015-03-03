var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var sniper = require('sniper');
var healer = require('healer');
var lazy_harvester = require('lazy_harvester');
var bus = require('bus');

var factory = require('factory');

var road = require('road');

var factoryData = {};
factoryData.harvesterNumbers = 0;
factoryData.builderNumbers = 0;
factoryData.guardNumbers = 0;
factoryData.healerNumbers = 0;
factoryData.lazy_harvesterNumbers = 0;
factoryData.busNumbers = 0;
factoryData.harvesterSmallestTimeToLive = undefined;
factoryData.listHarvester = new Array();
factoryData.listBus = new Array();

for(var name in Game.creeps) {
  var creep = Game.creeps[name];

	if(creep.memory.role == 'harvester') {
		harvester(creep);
		factoryData.harvesterNumbers++;

		if (factoryData.harvesterSmallestTimeToLive === undefined || factoryData.harvesterSmallestTimeToLive > creep.ticksToLive)
		  factoryData.harvesterSmallestTimeToLive = creep.ticksToLive;
	}
	else if(creep.memory.role == 'builder') {
		builder(creep);
		factoryData.builderNumbers++;
	}
	else if(creep.memory.role == 'guard') {
    guard(creep);
    factoryData.guardNumbers++;
  }
  else if(creep.memory.role == 'sniper') {

    sniper(creep);
    factoryData.guardNumbers++;
  }
  else if (creep.memory.role == 'healer') {
    healer(creep);
    factoryData.healerNumbers++;
  }
  else if (creep.memory.role == 'lazy_harvester') {
    lazy_harvester(creep);
    factoryData.lazy_harvesterNumbers++;
    factoryData.listHarvester.push(creep.memory);
  }
  else if (creep.memory.role == 'bus') {
    bus(creep);
    factoryData.busNumbers++;
    factoryData.listBus.push(creep.memory);
  }
}

if (factoryData.harvesterSmallestTimeToLive === undefined)
  factoryData.harvesterSmallestTimeToLive = 0;

factory.createRobotz(factoryData);

if (Game.flags.Wall1 !== undefined && Game.flags.Wall2)
  road.buildWallBetweenFlags(Game.flags.Wall1, Game.flags.Wall2);

if (Game.flags.Ext)
  road.buildExtensionFlags(Game.flags.Ext);


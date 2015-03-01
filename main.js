var harvester = require('harvester');
var builder = require('builder');
var guard = require('guard');
var sniper = require('sniper');
var healer = require('healer');

var road = require('road');

var factoryData = {};
factoryData.harvesterNumbers = 0;
factoryData.builderNumbers = 0;
factoryData.guardNumbers = 0;
factoryData.healerNumbers = 0;

for(var name in Game.creeps) {
  var creep = Game.creeps[name];

	if(creep.memory.role == 'harvester') {
		harvester(creep);
		factoryData.harvesterNumbers++;
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
}

factory.createRobotz();


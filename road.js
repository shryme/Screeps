/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = {
  buildAllRoads: function(spawn) {
    var targets = spawn.room.find(Game.SOURCES_ACTIVE);
    for (var i = 0; i < targets.length; i++) {
      var path = spawn.room.findPath(spawn.pos, targets[i].pos, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
      for (var j = 0; j < path.length - 1; j++) {
        var tiles = spawn.room.lookAt(path[j].x, path[j].y);
        var valid = true;
        for (var k = 0; k < tiles.length; k++) {
          if (tiles[k].type === 'constructionSite') {
            valid = false;
            k = tiles.length + 1;
          }
        }
        if (valid)
          spawn.room.createConstructionSite(path[j].x, path[j].y, Game.STRUCTURE_ROAD);
      }
    }
	},
	buildClosestRoom: function(spawn) {
    var target = spawn.pos.findClosest(Game.SOURCES_ACTIVE);

    var path = spawn.room.findPath(spawn.pos, target.pos, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});
    for (var j = 0; j < path.length - 1; j++) {
      var tiles = spawn.room.lookAt(path[j].x, path[j].y);
      var valid = true;
      for (var k = 0; k < tiles.length; k++) {
        if (tiles[k].type === 'constructionSite') {
          valid = false;
          k = tiles.length + 1;
        }
      }
      if (valid)
        spawn.room.createConstructionSite(path[j].x, path[j].y, Game.STRUCTURE_ROAD);
    }
	},
	buildWallBetweenFlags: function(flag1, flag2) {

	  var path = flag1.room.findPath(flag1.pos, flag2.pos, {maxOps: 1000, ignoreDestructibleStructures: true, ignoreCreeps: true});

	  flag1.room.createConstructionSite(flag1.x, flag1.y, Game.STRUCTURE_WALL);
	  for (var i = 0; i < path.length; i++) {
	    flag1.room.createConstructionSite(path[i].x, path[i].y, Game.STRUCTURE_WALL);
	  }

	  flag1.remove();
	  flag2.remove();

	},
	buildExtensionFlags: function(flag) {

	  flag.room.createConstructionSite(flag.pos.x, flag.pos.y, Game.STRUCTURE_EXTENSION);
	  flag.remove();

	}


}

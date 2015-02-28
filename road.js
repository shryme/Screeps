/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function (spawn) {

  var targets = spawn.room.find(Game.SOURCES_ACTIVE);
  for (var i = 0; i < targets.length; i++) {
    var path = spawn.room.findPath(spawn.pos, targets[i].pos);
    for (var j = 0; j < path.length; j++) {
      Game.rooms.sim.createConstructionSite(path[j].x, path[j].y, Game.STRUCTURE_ROAD);
    }
  }

}
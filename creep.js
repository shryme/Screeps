var Creep = function(creep) {
    this.creep = creep;
    this.room = creep.room;
    this.name = creep.name;
    this.id = creep.id;
};

module.exports = Creep;

Creep.prototype.getRole = function() {
  return this.creep.memory.role;
}

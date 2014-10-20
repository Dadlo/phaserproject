var Tower = function(xTile, yTile, sprite, damage, range, fireRate, health, imortal) {
    // Adiciona a sprite da torre
    this.tower = this.game.add.sprite(xTile * tilesize, yTile * tilesize, sprite);
    // Salva tile em que está
    this.tower.xTile = xTile;
    this.tower.yTile = yTile;
    // Dano que a torre causa
    this.tower.damage = damage;
    // Area que a torre atingre
    this.tower.range = range;
    // Vida da torre
    this.tower.health = health;
    // Tempo entre os tiros
    this.tower.fireRate = fireRate;
    this.tower.lastShot = this.game.time.now;
    // Adiciona a torre no grupo de torres
    towers.add(this.tower);
    // Se a torre pode ser atingida
    this.tower.imortal = imortal;
    // Define os métodos da torre
    //tower.prototype.place(this.monster);
    //tower.prototype.setPosition(this.monster);
    //tower.prototype.attack(this.monster);
    //tower.prototype.damageTaken(this.monster);
    //tower.prototype.death(this.monster);

}

Tower.prototype.place = function(pointer) {
    this.game.input.onDown.add(Tower.prototype.setPosition, this);
}

Tower.prototype.setPosition = function(pointer, sprite, damage, range, fireRate, health) {
    var xTile = pointer.worldX - (pointer.worldX % tilesize);
    var yTile = pointer.worldY - (pointer.worldY % tilesize);
    new Tower(xTile, yTile, sprite, damage, range, fireRate)
}

Tower.prototype.attack = function(tower) {
    if (this.game.time.now > tower.lastShot) {
        // TODO - Atirar
        console.log("pew");
        tower.lastShot = game.time.now + tower.fireRate;
    }
}

Tower.prototype.damageTaken = function(tower, monster) {
    tower.health - monster.damage;
    if (tower.health <= 0 && tower.imortal==false) {
        Tower.prototype.death(this);
    }
}

Tower.prototype.death = function(tower) {
    // TODO
}

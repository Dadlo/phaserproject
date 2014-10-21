var Tower = function(xTile, yTile, sprite, damage, range, fireRate, health, imortal, bulletSpeed, bulletSprite) {
    // Adiciona a sprite da torre
    this.tower = game.add.sprite(xTile * tileSize, yTile * tileSize, sprite);
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
    this.tower.lastShot = game.time.now;
    // recebe velocidade do tiro
    this.tower.bulletSpeed = bulletSpeed;
    // recebe sprite do tiro
    this.tower.bulletSprite = bulletSprite;
    // Adiciona a torre no grupo de torres
    towers.add(this.tower);
    // Se a torre pode ser atingida
    this.tower.imortal = imortal;
    this.tower.upgrade = 0;

}

Tower.prototype.place = function(pointer) {
    game.input.onDown.add(Tower.prototype.setPosition, this);
}

Tower.prototype.setPosition = function(pointer, sprite, damage, range, fireRate, health, imortal, bulletSpeed, bulletSprite) {
    var xTile = ( pointer.worldX - (pointer.worldX % tileSize) ) / tileSize;
    var yTile = ( pointer.worldY - (pointer.worldY % tileSize) ) / tileSize;
    new Tower(xTile, yTile, sprite, damage, range, fireRate, imortal, bulletSpeed, bulletSprite);
}

Tower.prototype.attack = function(tower) {
    if (game.time.now > tower.lastShot) {
        // TODO - Atirar
        targets = [];
        monsters.forEach(function(monster) {
            if (monster.yTile - tower.yTile < tower.range && monster.xTile - tower.xTile < tower.range) {
                targets.push(monster); // lista todos os alvos no range
            }
        }); 
        // TODO - AI da Torre para escolher qual alvo atirar
        if (targets.length>0){
            Tower.prototype.fire(tower,targets[0]);
        }
        tower.lastShot = game.time.now + tower.fireRate;
    }
}

Tower.prototype.fire = function(tower, monster) {
    //Bullet = function (startX, startY, destX, destY, speed, damage, shooter, sprite)
    new Bullet(tower.x, tower.y, monster.x, monster.y, tower.bulletSpeed, tower.damage, tower, tower.bulletSprite);
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

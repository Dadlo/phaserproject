var Bullet = function (startX, startY, destX, destY, speed, damage, shooter, sprite) {
    this.bullet = this.game.add.sprite(startX, startY, sprite);
    this.bullet.startX = startX;
    this.bullet.startY = startY;
    this.bullet.destX = destX;
    this.bullet.destY = destY;
    this.bullet.speed = speed;
    this.bullet.damage = damage;
    this.bullet.shooter = shooter;
    Bullet.prototype.setVelocVector(this.bullet);
};

Bullet.prototype.setVelocVector = function (bullet) {
    //o phaser comeca a deslocar o objeto com veloc constante
    //normaliza
    var distX = bullet.destX - bullet.startX,
    var distY = bullet.destY - bullet.startY;
    
    if (distX > distY) {
        bullet.body.velocity.set(distX / Math.abs(distX) * bullet.speed,
                                      distY / Math.abs(distX) * bullet.speed);
    } else {
        bullet.body.velocity.set(distX / Math.abs(distY) * bullet.speed,
                                      distY / Math.abs(distY) * bullet.speed);
    }
};
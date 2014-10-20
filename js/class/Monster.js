var Monster = function(xTile, yTile, sprite, spriteLength, speed, damage) {
    // Adiciona sprite na posicao
    this.monster = game.add.sprite(xTile * tilesize, yTile * tilesize, sprite);
    this.monster.scale.set(0.2);
    // Adiciona animacao de andar em relacao ao sprite adicionado
    this.monster.animations.add('walk');
    this.monster.animations.play('walk', spriteLength, true);
    // ancora no centro de cada sprite
    this.monster.anchor.setTo(0.5, 0.5);
    // Controle de velocidade global, x e y
    this.monster.speedX = 0;
    this.monster.speedY = 0;
    this.monster.speed = speed;
    // Recebe o dano que o monstro causara nas barreiras
    this.monster.damage = damage;
    // Tile em que o monstro esta
    this.monster.tile = 0;
    // Adiciona o monstro no grupo de monstros
    monsters.add(this.monster);
    // Declara metodos da classe monstro
    //monster.prototype.move(this.monster);
    //monster.prototype.attack(this.monster);
    //monster.prototype.nextMove(this.monster);
    //monster.prototype.damageTaken(this.monster);
    //monster.prototype.death(this.monster);
}

Monster.prototype.move = function(monster) {
    // TODO
    monster.x += monster.speedX;
    monster.y += monster.speedY;
}

Monster.prototype.attack = function(monster) {
    // TODO
}

Monster.prototype.nextMove = function(monster) {
    // TODO
    monster.tile++;
}

Monster.prototype.damageTaken = function(monster) {
    // TODO
}

Monster.prototype.death = function(monster) {
    // TODO
}
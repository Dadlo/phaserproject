var Monster = function(xTile, yTile, sprite, spriteLength, speed, damage) {
    // Adiciona sprite na posicao
    this.monster = game.add.sprite(xTile * tileSize, yTile * tileSize, sprite);
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
    this.monster.tile = -1;
    // Adiciona o monstro no grupo de monstros
    monsters.add(this.monster);
    // Inicia movimentacao
    Monster.prototype.nextMove(this.monster);
    Monster.prototype.move(this.monster);
}

Monster.prototype.move = function(monster) {
    // TODO
    monster.x += monster.speedX;
    monster.y += monster.speedY;

    if (monster.speedX > 0 && monster.x >= monster.nextPosX) {
        monster.x = monster.nextPosX;
        Monster.prototype.nextMove(monster);
    }
    else if (monster.speedX < 0 && monster.x <= monster.nextPosX) {
        monster.x = monster.nextPosX;
        Monster.prototype.nextMove(monster);
    }
    else if (monster.speedY > 0 && monster.y >= monster.nextPosY) {
        monster.y = monster.nextPosY;
        Monster.prototype.nextMove(monster);
    }
    else if (monster.speedY < 0 && monster.y <= monster.nextPosY) {
        monster.y = monster.nextPosY;
        Monster.prototype.nextMove(monster);
    }
}

Monster.prototype.attack = function(monster) {
    // TODO
}

Monster.prototype.nextMove = function(monster) {
    if (monster.tile < tilePath.length-1) {
        monster.tile++;
    }
    console.log(monster.tile);
    monster.nextPosX = parseInt(tilePath[monster.tile].x * tileSize);
    monster.nextPosY = parseInt(tilePath[monster.tile].y * tileSize);
    if (monster.nextPosX > monster.x) {
        monster.speedX = monster.speed;
        monster.angle = 0;
    } else if (monster.nextPosX < monster.x) {
        monster.speedX = -monster.speed;
        monster.angle = 180;
    } else {
        monster.speedX = 0;
    }
    if (monster.nextPosY > monster.y) {
        monster.speedY = monster.speed;
        monster.angle = 90;
    } else if (monster.nextPosY < monster.y) {
        monster.speedY = -monster.speed;
        monster.angle = -90;
    } else {
        monster.speedY = 0;
    }
}

Monster.prototype.damageTaken = function(monster) {
    // TODO
}

Monster.prototype.death = function(monster) {
    // TODO
}
var Village = function(sprite, health) {
    // verifica o ponto final do caminho
    xTile = tilePath[tilePath.length-2].x;
    yTile = tilePath[tilePath.length-2].y;
    // Adiciona a sprite
    this.village = game.add.sprite(xTile * tileSize, yTile * tileSize, sprite);
    // Vida da cidade
    this.village.health = health;
    // Adiciona o monstro no grupo de monstros
    villages.add(this.village);

    // TODO - barra de vida da vila - com atualizao a cada dano tomado no damageTaken
}

Village.prototype.damageTaken = function(village, monster) {
    console.log(village.health);
    village.health -= monster.damage;
    monster.kill();
    monster.lifeBarStatus.destroy();
    monster.lifeBar.destroy();
    if (village.health <= 0) {
        Village.prototype.death(village);
    }
}

Village.prototype.death = function(village) {
    // TODO - condicao de derrota
    if (village.health <= 0) {
        village.kill();
    }
    //this.game.state.start('death_state');
}

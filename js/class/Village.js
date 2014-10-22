var Village = function(sprite, health) {
    // verifica o ponto final do caminho
    xTile = tilePath[tilePath.length-2].x;
    yTile = tilePath[tilePath.length-2].y;
    // Adiciona a sprite
    this.village = game.add.sprite(xTile * tileSize, yTile * tileSize, sprite);
    // Vida da cidade
    this.village.health = health;
    this.village.totalHealth = health;
    // Adiciona o monstro no grupo de monstros
    villages.add(this.village);

    // Desenha um retângulo cheio sobre a vila
    this.village.lifeBar = game.add.graphics(0, 0); // inicia o retangulo
    this.village.lifeBar.lineStyle(2, 0x000000, 1); // largura, cor, alfa
    this.village.lifeBar.beginFill(0xFFFF00, 0.8) // cor, alfa
    this.village.lifeBar.drawRect(this.village.x-this.village.width/2, this.village.y-this.village.height/2, this.village.width, 5); // x, y, largura, altura

    // Desenha um retângulo de vida sobre a vila
    this.village.lifeBarStatus = game.add.graphics(0, 0); // inicia o retangulo
    this.village.lifeBarStatus.lineStyle(2, 0x000000, 0); // largura, cor, alfa
    this.village.lifeBarStatus.beginFill(0x00FF00, 0.9) // cor, alfa
    this.village.lifeBarStatus.drawRect(this.village.x-this.village.width/2, this.village.y-this.village.height/2, this.village.width, 5); // x, y, largura, altura

}

Village.prototype.damageTaken = function(village, monster) {
    console.log(village.health);
    village.health -= monster.damage;
    monster.kill();
    monster.lifeBarStatus.destroy();
    monster.lifeBar.destroy();

    // Atualiza a barra de vida
    village.lifeBar.x = village.x-village.width;
    village.lifeBar.y = village.y-village.height/2;
    // Calcula o dano tomado - escala e posiciona a barra de vida atual
    damTaken = village.health/village.totalHealth;
    village.lifeBarStatus.scale.x = damTaken;
    // Atualiza posicao da barra de vida atual
    village.lifeBarStatus.y = village.y-village.height/2;
    village.lifeBarStatus.x += (1-(village.health/village.totalHealth))*village.width/2;

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

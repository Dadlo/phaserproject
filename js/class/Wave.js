var Wave = function(monsterSprite, timeToStart, timeBetween, points) {
    // Recebe as variaveis
    // cria a wave como sprite para receber as propriedades - verificar como gerar objeto generico
    this.wave = game.add.sprite(-100, -100, 'person');
    this.wave.monsterSprite = monsterSprite;
    // Verifica quantidade diferentes de monstros
    this.wave.monstersType = monsterSprite.length;
    // define o tempo ate o inicio da onda
    this.wave.timeToStart = timeToStart;
    // define o tempo entre os monstros
    this.wave.timeBetween = timeBetween;
    // define os pontos que receberá caso ganhe a onda
    this.wave.points = points;
    // define numero de monstros destruidos
    this.wave.deaths = 0;
    // Verifica a quantidade total de monstros
    var i = 0;
    this.wave.waveLenght = 0;
    if (i <= this.wave.monstersType) {
        this.wave.waveLenght += this.wave.monsterSprite[i].amount;
        i++;
    }
    // inicia a onda
    Wave.prototype.count(this.wave);
}

Wave.prototype.count = function(wave) {
    // TODO - fazer o timeToStart como tempo até iniciar a onda
    // wave.timeToStart;
    Wave.prototype.begin(wave);
}

Wave.prototype.checkEnd = function(wave) {
    // TODO
    if (wave.deaths >= wave.waveLenght) {
        Wave.prototype.end(wave);
    }
}

Wave.prototype.begin = function(wave) {
    var i = 0;
    var j = 0;
    var monstersBlock = setInterval(function() {
        // Para cada tipo de monstro
        if (j < wave.monstersType) {
            // Para cada um dentro da quantidade definida em amount
            if (i < wave.monsterSprite[j].amount) {
                // Cria o monstro com o sprite especifico
                new Monster(1, 0, wave.monsterSprite[j].sprite, 1, 1, 1, 150);
                i++;
            } else {
                j++;
                i = 0;
            }
        }
        else {
            clearTimeout(monstersBlock);
        }
    }, wave.timeBetween);
}

Wave.prototype.end = function() {
    // TODO
    score += points;
    waveCurrent++;
}
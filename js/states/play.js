var play_state = {

    create: function() { 
        // Declaracao de variaveis
        tileSize = 32; // tamanho do tile para validacao de posicao

        // Inicia a fisica do jogo
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Cria e aplica o tile map
        map = this.game.add.tilemap('jsonmap');
        map.addTilesetImage('Desert', 'tilesmap');
        layer = map.createLayer('Ground');
        layer.resizeWorld();
        //layer.debug = true;

        tilePath = [{x:1, y:1}, {x:2, y:1}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6}];

        // Cria grupo de monstros e de torres
        monsters = this.game.add.group();
        monsters.enableBody = true;
        this.game.physics.enable(monsters, Phaser.Physics.ARCADE);
        towers = this.game.add.group();
        towers.enableBody = true;
        this.game.physics.enable(towers, Phaser.Physics.ARCADE);

        // Adiciona botao de iniciar para iniciar a onda
        this.startWaveButton = this.game.add.button(650, 50, 'start', this.newWave, this, 1, 0, 1);
        this.startWaveButton.scale.set(0.3);
        this.startWaveButton.anchor.setTo(0.5,0.5);
        this.startWaveButton.inputEnabled = true;
        this.startWaveButton.input.useHandCursor = true;

    },

    update: function() {
        monsters.forEach(function(monster) {
            Monster.prototype.move(monster);
        });  
    },

    restart_game: function() {
        // Voltar para o estado 'menu'
        this.game.state.start('menu');
    },

    newWave: function() {
        var i = 0;
        var monstersBlock = setInterval(function() {
            //console.log(i);
            if (i < 5) {
                new Monster(1, 0, 'logo', 1, 1, 1);
                i++;
            } else {
                clearTimeout(monstersBlock);
            }
        }, 1000);
    },

};
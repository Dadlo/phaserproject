var play_state = {

    create: function() { 
        // Declaracao de variaveis
        tileSize = 32; // tamanho do tile para validacao de posicao

        // Zera onde - level e pontuacao
        waveCurrent = 0;
        levelCurrent = 0;
        score = 0;

        // Inicia a fisica do jogo
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Cria e aplica o tile map
        map = this.game.add.tilemap('jsonmap');
        map.addTilesetImage('Desert', 'tilesmap');
        layer = map.createLayer('Ground');
        layer.resizeWorld();
        //layer.debug = true;

        tilePath = [{x:1, y:1}, {x:2, y:1}, {x:2, y:2}, {x:2, y:3}, {x:2, y:4}, {x:2, y:5}, {x:2, y:6},
        {x:3, y:6}, {x:4, y:6}, {x:5, y:6}, {x:6, y:6}, {x:7, y:6}, {x:8, y:6}, {x:9, y:6}, {x:10, y:6},
        {x:10, y:7}, {x:11, y:7}, {x:12, y:7}, {x:13, y:7}, {x:13, y:8}, {x:14, y:8}, {x:15, y:8}, {x:16, y:8},
        {x:16, y:9}, {x:16, y:10}, {x:17, y:10}, {x:18, y:10}, {x:19, y:10}, {x:20, y:10}, {x:20, y:11}, {x:21, y:11},
        {x:22, y:11}, {x:23, y:11}, {x:24, y:11}, {x:25, y:11}, {x:26, y:11}, {x:27, y:11}, {x:28, y:11}, {x:29, y:11}];

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

        // Adiciona botao de voltar ao menu
        this.stopButton = this.game.add.button(650, 140, 'start', this.restartGame, this, 1, 0, 1);
        this.stopButton.scale.set(0.3);
        this.stopButton.tint = 0xff00ff;
        this.stopButton.anchor.setTo(0.5,0.5);
        this.stopButton.inputEnabled = true;
        this.stopButton.input.useHandCursor = true;

        // Desenha um retângulo de menu de botões na parte inferior
        var shape = this.game.add.graphics(0, 0); // inicia o retangulo
        shape.lineStyle(2, 0x000000, 0.8); // largura, cor, alfa
        shape.beginFill(0x222222, 0.8) // cor, alfa
        shape.drawRect(0, (this.game.height/5)*4, this.game.width, this.game.height/5); // x, y, largura, altura
        shape.endFill();

    },

    update: function() {
        monsters.forEach(function(monster) {
            Monster.prototype.move(monster);
        });  
    },

    restartGame: function() {
        // Voltar para o estado 'menu'
        this.game.state.start('menu');
    },

    newWave: function() {
        // cria uma nova onda
        // formato de envio dos monstros da onda: [{sprite:'person', amount:3},{sprite:'person', amount:3}]
        // Pode intercalar e repetir monstros e sequencias
        // Ele deixa um espaço vazio entre cada item da onda
        new Wave([{sprite:'person', amount:3},{sprite:'person', amount:2}], 5000, 1000, 250);
    },

};
var play_state = {

    // TODO PRINCIPAL
    // - criar base a ser defendida com vida - hj inexistente
    // - criar lista de monstros com sprite, forca, vida etc - hj hard coded
    // - criar lista de niveis com detalhes das ondas - hj unico
    // - criar mecanismo de evolucao dentro dos niveis - hj unico
    // - levar para classe propria a leitura do tileMap para simplificar o uso de varios mapas - hj unico
    // - condicao de vitoria da onda - hj inexistente
    // - condicao de derrota do jogo - hj inexistente
    // - splash screen - hj inexistente
    // - tela de derrota - hj inexistente
    // - reset do jogo completo com limpesa dos sprites e variaveis - hj inutil
    // - ajustar o preloader - hj com gif circular e nao barra
    // - criar validacao de posicionamento de novas torres - checar se nao e caminho e se ja nao existe uma torre la -- lista com esses pontos
    // - criar dentro do estado de play os estados de inclusao de torre e de ondas - trabalhar com o tempo de onda - hj inexistente
    // - criar sistema de upgrade para torres // acredito que remover a torre atual e aplicar uma nova com as novas prorpiedades seja o melhor - hj inexistente
    // - criar sistema de caixa de selecao para o upgrade das torres - hj inexistente
    // - criar textos de contador de tempo para proxima onda - hj inexistente
    // - criar textos de pontuacao atual - hj inexistente
    // - criar textos de onda atual - hj inexistente
    // - criar texto de level atual - com do mapa - hj inexistente

    // - Caso tudo seja atingido verificar de utilizar pathfinding a star ao inves de mapear o caminho manualmente


    create: function() { 
        // Declaracao de variaveis
        tileSize = 32; // tamanho do tile para validacao de posicao

        // Zera onde - level e pontuacao
        waveCurrent = 0;
        levelCurrent = 0;
        score = 0;
        // define dinheiro inicial do jogador
        money = 1000;

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

        // Cria grupo de monstros
        monsters = this.game.add.group();
        monsters.enableBody = true;
        this.game.physics.enable(monsters, Phaser.Physics.ARCADE);

        // Cria grupo de torres
        towers = this.game.add.group();
        towers.enableBody = true;
        this.game.physics.enable(towers, Phaser.Physics.ARCADE);

        // Cria grupo de balas
        bullets = this.game.add.group();
        bullets.enableBody = true;
        this.game.physics.enable(bullets, Phaser.Physics.ARCADE);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('anchor.x', 0.5);

        // Adiciona botao de iniciar para iniciar a onda
        this.startWaveButton = this.game.add.button(650, 50, 'start', this.newWave, this, 1, 0, 1);
        this.startWaveButton.scale.set(0.3);
        this.startWaveButton.anchor.setTo(0.5,0.5);
        this.startWaveButton.inputEnabled = true;
        this.startWaveButton.input.useHandCursor = true;

        // Adiciona botao de voltar ao menu
        // TODO - remover os objetos e limpar dados antes de voltar
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

        // Desenha os botes de adicionar torre
        // Torre Tipo 1
        tower1Static = game.add.sprite(96, 512, 'tower');
        tower1 = game.add.sprite(96, 512, 'tower');
        tower1.inputEnabled = true;
        tower1.input.enableDrag();
        tower1.input.enableSnap(32, 32, true, true);
        tower1.events.onDragStop.add(this.onDragStop, this);

        // Torre Tipo 2
        tower2Static = game.add.sprite(160, 512, 'tower2');
        tower2 = game.add.sprite(160, 512, 'tower2');
        tower2.inputEnabled = true;
        tower2.input.enableDrag();
        tower2.input.enableSnap(32, 32, true, true);
        tower2.events.onDragStop.add(this.onDragStop, this);

        // Torre Tipo 3
        tower3Static = game.add.sprite(224, 512, 'tower3');
        tower3 = game.add.sprite(224, 512, 'tower3');
        tower3.inputEnabled = true;
        tower3.input.enableDrag();
        tower3.input.enableSnap(32, 32, true, true);
        tower3.events.onDragStop.add(this.onDragStop, this);

        // Cria textos de pontuacao dinheiro e onda
        var text = "Money: "+money+ " \nScore: " + score;
        var style = { font: "14px Arial", fill: "#000000", align: "left" };
        statusText = game.add.text(10, 10, text, style);

    },

    update: function() {
        // Faz cada monstro andar
        monsters.forEach(function(monster) {
            Monster.prototype.move(monster);
        });  

        // Faz cada torre verificar o range
        towers.forEach(function(tower) {
            Tower.prototype.attack(tower);
        });

        // Verifica colisao da bala com monstro
        this.game.physics.arcade.overlap(bullets, monsters, this.collisionChecker, null, this);
        this.updateTexts();
    },

    onDragStop: function(sprite, pointer) {
        // TODO - checar se pode adicionar o sprite na posicao
        var x = pointer.x;
        var y = pointer.y;
        var sprite, damage, range, fireRate, health, imortal, bulletSpeed, price, bulletSprite;
        if (sprite.key == 'tower') {
            sprite = 'tower';
            damage =  50;
            range =  4;
            fireRate =  1500;
            health =  1000;
            imortal =  true;
            bulletSpeed =  50;
            price =  100;
            bulletSprite =  'bullet';

            tower1.x = 96;
            tower1.y = 512;
        } else if (sprite.key == 'tower2') {
            sprite = 'tower2';
            damage =  300;
            range =  2;
            fireRate =  2500;
            health =  1000;
            imortal =  true;
            bulletSpeed =  40;
            price =  300;
            bulletSprite =  'bullet';
            tower2.x = 160;
            tower2.y = 512;
        } else if (sprite.key == 'tower3') {
            sprite = 'tower3';
            damage =  25;
            range =  5;
            fireRate =  500;
            health =  1000;
            imortal =  true;
            bulletSpeed =  75;
            price =  150;
            bulletSprite =  'bullet';
            tower3.x = 224;
            tower3.y = 512;
        }
        if (money >= price) {
            new Tower(x, y, sprite, damage, range, fireRate, health, imortal, bulletSpeed, price, bulletSprite);
        } else {
            // TODO - mensagem de sem dinheiro
        }
    },

    updateTexts: function() {
        statusText.setText("Money: "+money+ " \nScore: " + score);
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

    collisionChecker: function(bullet, monster) {
        // destroi a bala
        bullet.kill();
        // tira o dano do monstro
        monster.health -= bullet.damage;
        // manda o monstro verificar se morreu
        Monster.prototype.death(monster);
    },

};
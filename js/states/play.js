var play_state = {

    create: function() { 
        // Inicia a fisica do jogo
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Cria e aplica o tile map
        map = this.game.add.tilemap('jsonmap');
        map.addTilesetImage('Desert', 'tilesmap');
        layer = map.createLayer('Ground');
        layer.resizeWorld();
        //layer.debug = true;
    },

    update: function() {
        //   
    },

    restart_game: function() {
        // Voltar para o estado 'menu'
        this.game.state.start('menu');
    },

};
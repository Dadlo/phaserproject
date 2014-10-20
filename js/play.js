var play_state = {

    create: function() { 


        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        map = this.game.add.tilemap('jsonmap');

        map.addTilesetImage('Nome do Mapa', 'tilesmap');

        layer = map.createLayer('Nome da Layer');

        layer.resizeWorld();


    },

    update: function() {
        //   
    },

    restart_game: function() {
        // Voltar para o estado 'menu'
        this.game.state.start('menu');
    },

};
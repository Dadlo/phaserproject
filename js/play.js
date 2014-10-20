var play_state = {

    create: function() { 
        var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    },

    update: function() {
        //   
    },

    restart_game: function() {
        // Voltar para o estado 'menu'
        this.game.state.start('menu');
    },

};
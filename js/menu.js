var menu_state = {
    create: function() {
        // Define variaveis de posicao
        var x = game.world.width/2-20;
        var y = game.world.height/2;
  
        // Adiciona o botao de iniciar
        this.startButton = this.game.add.button(x, y, 'start', this.start, this, 1, 0, 1);
        this.startButton.scale.set(0.3);
        this.startButton.anchor.setTo(0.5,0.5);
        this.startButton.inputEnabled = true;
        this.startButton.input.useHandCursor = true;

    },

    // Vai para o estado de 'start' iniciando o jogo
    start: function() {
        this.game.state.start('play');
    },

};
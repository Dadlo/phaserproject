'use strict';
var boot_state = {

    preload: function() {

        this.load.image('preloader', '../assets/sprites/loading.gif');

    },

    loading: function() {
        // Caso queira exibir algum texto
    },

    create: function() {
        this.game.state.start('preload')

    },

};

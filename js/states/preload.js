var load_state = {

    preload: function() {
        this.ready = false;
        this.game.load.start();
        this.loading = this.add.sprite(this.game.world.width/2-50,this.game.world.height/2-50, 'preloader');
        this.loading.anchor.setTo(0.5, 0.5);
        this.loading.scale.set(0.3);
        this.game.load.setPreloadSprite(this.loading);

        this.game.stage.backgroundColor = '#222222';
        this.game.load.image('logo', '../../assets/logo/phaser.png');
        this.game.load.spritesheet('start', '../../assets/sprites/startsprite.png',481, 193,2);

        this.game.load.tilemap('jsonmap', '../../assets/tilemaps/desert.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tilesmap', '../../assets/tilemaps/tmw_desert_spacing.png');


    },

    loading: function() {
        // Caso queira exibir algum texto
    },

    create: function() {
        this.game.load.onLoadComplete.addOnce(this.loadComplete, this);
    },

    update: function() {
        if(!!this.ready) {
          this.game.state.start('menu');
        }
    },

    loadComplete: function() {
        // Assim que tudo estiver carregado, vai para o estado de 'menu'      
        this.ready = true;
    },


};

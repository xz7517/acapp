class AcGameMenu{
    constructor(root){
        this.root= root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single">
            Single
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi">
            Multi
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            Settings
        </div>
    </div>
</div>
`);     
        this.$menu.hide();
        this.root.$ac_game.append(this.$menu);
        this.$single = this.$menu.find(`.ac-game-menu-field-item-single`);
        this.$multi = this.$menu.find(`.ac-game-menu-field-item-multi`);
        this.$settings = this.$menu.find(`.ac-game-menu-field-item-settings`);
        this.start();
    
    }



    start(){
        this.add_listening_events();
    }

    add_listening_events(){
        let outer = this;
        this.$single.click(function(){
            outer.hide();
            outer.root.playground.show();
        }
        );
        this.$multi.click(function(){
            console.log("click multi");
        });

        this.$settings.click(function(){
            console.log("click settings");

            outer.root.settings.logout_on_remote();
        });

    }

    show(){
        this.$menu.show();
    }
    
    hide(){
        this.$menu.hide();
    }

}

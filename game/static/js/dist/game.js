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
        });

    }

    show(){
        this.$menu.show();
    }
    
    hide(){
        this.$menu.hide();
    }

}
class AcGamePlayground{
    constructor(root){
        this.root = root;
        this.$playground = $(`<div>game-screen</div>`);

        this.hide();
        this.root.$ac_game.append(this.$playground);
       
        this.start();
    }
    

    start(){

    }

    show(){
        this.$playground.show();
    }

    hide(){
        this.$playground.hide();
    }
}
class AcGame{
    constructor(id)
    {   
        console.log("check:");
        this.id = id;
        this.$ac_game = $(`#`+id);
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);

    }
}

class Settings{
    constructor(root){
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcWingOS) this.platform="ACAPP";
        this.username = "";
        this.photo ="";
        
        this.$settings = $(`
<div class="ac-game-settings">
    <div class="ac-game-settings-login">
        <div class="ac-game-settings-title">
            Login
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="username">
            </div>
        </div>
        <div class ="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="password">
            </div>
        </div>

        <div class ="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>login</button>
            </div>
        </div>

        <div class="ac-game-settings-error-message">
        </div>

        <div class="ac-game-settings-option">
            Register
        </div>
        <br>
        <div class="ac-game-settings-acwing">
            <img width = "30" src="https://app999.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <br>
            <div>
                Acwing login
            </div>
        </div>
    </div>

    <div class="ac-game-settings-register">
        <div class="ac-game-settings-title">
            Register
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="username">
            </div>
        </div>
        <div class ="ac-game-settings-password ac-game-settings-password-first">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="password">
            </div>
        </div>
        <div class ="ac-game-settings-password ac-game-settings-password-second">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="password confirmation">
            </div>
        </div>

        <div class ="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>register</button>
            </div>
        </div>

        <div class="ac-game-settings-error-message">
        </div>

        <div class="ac-game-settings-option">
            Login
        </div>
        <br>
        <div class="ac-game-settings-acwing">
            <img width = "30" src="https://app999.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <br>
            <div>
                Acwing login
            </div>
        </div>
     </div>
</div>

`)      
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");
        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");


        this.$register.hide();
        
        
        this.root.$ac_game.append(this.$settings);
        this.start();
    }

    start(){
        this.getinfo();
        this.add_listening_events();
    }
    
    add_listening_events(){
        this.add_listening_events_login();
        this.add_listening_events_register();
    }
    add_listening_events_login(){
        let outer = this;
        //console.log("listening login");
        this.$login_register.click(function(){
           // console.log("go to register");
            outer.register();
        });

        this.$login_submit.click(function(){
            outer.login_on_remote();
        });
    }

    add_listening_events_register(){
        let outer = this;
        this.$register_login.click(function(){
            //console.log("go to login");
            outer.login();
        });

        this.$register_submit.click(function(){
            outer.register_on_remote();
        });
    }
    

    login_on_remote(){
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();
        $.ajax({
            url:"https://app999.acapp.acwing.com.cn/settings/login/",
            type:"GET",
            data:{
                username:username,
                password:password,
            },
            success:function(resp){
                console.log(resp);
                if(resp.result==="success"){
                   location.reload();
                }
                else{
                    outer.$login_error_message.html(resp.result);
                }
            }

        });
    }
    
    logout_on_remote(){
        if(this.platform ==="ACAPP"){
            return false;
        }
        else{
            $.ajax({
                url:"https://app999.acapp.acwing.com.cn/settings/logout/",
                type:"GET",
                success:function(resp){
                    console.log(resp);
                    if(resp.result ==="success"){
                        location.reload();
                    }
                }
               
            }); 
        }
    }

    register_on_remote(){
        console.log("register");
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();
         
        $.ajax({
            url:"https://app999.acapp.acwing.com.cn/settings/register",
            type:"GET",
            data:{
                username:username,
                password:password,
                password_confirm:password_confirm,
            },
            success:function(resp){
                if(resp.result ==="success"){
                    location.reload();
                
                }
                else{
                    outer.$register_error_message.html(resp.result);
                }
            }
        })
    }
    login(){
        this.$register.hide();
        this.$login.show();
    }

    register(){
        //console.log("go to register");
        this.$login.hide();
        this.$register.show();
    }


    getinfo(){
        let outer = this;
        $.ajax({
            url:"https://app999.acapp.acwing.com.cn/settings/getinfo/",
            type:"GET",
            data:{
                platform:outer.platform,
            },
            success:function(resp){
                console.log(resp);
                //console.log("hello here");
                if(resp.result ==="success")
                {   
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                }
                else{
                    outer.login();
                }
            }
        
        })
    }

    hide(){
        this.$settings.hide();
    }   

    show(){
        this.$settings.show();
    }
}
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
let AC_GAME_OBJECTS=[];
class AcGameObject{
    constructor(){
        AC_GAME_OBJECTS.push(this);
        this.has_called_start = false;
        this.timedelta = 0;
    }

    start(){

    }
    
    update(){

    }
    
    on_destroy(){

    }

    destroy(){

        this.on_destroy();
        for(let i=0; i<AC_GAME_OBJECTS.length;i++){
            if(AC_GAME_OBJECTS[i] === this){
                AC_GAME_OBJECTS.splice(i,1);
                break;
            }
        }
    }

}

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp){
    for(let i=0;i<AC_GAME_OBJECTS.length;i++){
        let obj = AC_GAME_OBJECTS[i];
        if(!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        }
        else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }

       

    }
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_ANIMATION);
}

requestAnimationFrame(AC_GAME_ANIMATION);

class GameMap extends AcGameObject{
    constructor(playground){
        super();
        this.playground = playground;
        this.$canvas = $(`<canvas></canvas>`);
        this.ctx = this.$canvas[0].getContext(`2d`);
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;

        this.playground.$playground.append(this.$canvas);

        
    }

    start(){
    }

    update(){
        this.render();
    }


    render(){
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height);

    }
}
class Particle extends AcGameObject {
    constructor(playground, x,y, radius, vx, vy, color,speed,move_length){
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x =x;
        this.y =y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.friction = 0.9;
        this.move_length = move_length;
        this.eps = 1;
    }

    start(){

    }

    update(){
        if(this.move_length < this.eps||this.speed < this.eps){
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.speed *= this.friction;
        this.move_length -= moved;

        this.render();
    }

    
    
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x , this.y, this.radius,0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
class Player extends AcGameObject{
    constructor(playground, x,y, radius, color, speed, is_me){
        super();
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.damage_x = 0;
        this.damage_y = 0;
        this.damage_speed = 0;
        this.move_length=0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = 0.1;
        this.cur_skill = null;

        if(this.is_me){
            this.img = new Image();
            this.img.src = this.playground.root.settings.photo;
        }
        this.spent_time = 0;
        this.friction = 0.9;
    }

    start(){
        if(this.is_me){
            this.add_listening_event();
        }
        else {
            let tx = Math.random()* this.playground.width;
            let ty = Math.random()* this.playground.height;
            this.move_to(tx,ty);
            
        }
    }
    
    add_listening_event(){

        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", function(){
            return false;
        });

        this.playground.game_map.$canvas.mousedown(function(e){
            const rect = outer.ctx.canvas.getBoundingClientRect();
            if(e.which=== 3){
                outer.move_to(e.clientX - rect.left, e.clientY - rect.top);
            }
            else if(e.which===1){
                if(outer.cur_skill === "fireball"){
                    outer.shoot_fireball(e.clientX - rect.left, e.clientY- rect.top);
                }

                outer.cur_skill = null;
            }

        });

        $(window).keydown(function(e){
            if(e.which ===81){
                outer.cur_skill = "fireball";
                return false;
            }
        });
    }

    shoot_fireball(tx,ty){
        let x = this.x, y = this.y;
        let radius = this.playground.height* 0.01;
        let angle = Math.atan2(ty-y, tx -x );
        let vx = Math.cos(angle), vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1;
        //console.log("shoot fire");
        new FireBall( this.playground, this, x, y, radius, vx, vy, color, speed, move_length, this.playground.height * 0.01);
    }



    get_dist(x1,y1,x2,y2){
        let dx= x1-x2;
        let dy= y1-y2;
        return Math.sqrt(dx*dx + dy*dy);
    }


    is_attacked(angle, damage){
        this.radius -= damage;
        if(this.radius < this.playground.height*0.01)
        {   
            this.destroy();
            return false;
        }

        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed  = damage*100;
        this.speed *=0.8;


        for(let i = 0; i< 20 + Math.random()*10; i++){
            let x = this.x, y = this.y;
            let radius = this.radius * Math.random()* 0.1;
            let angle = Math.PI*2 * Math.random();
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed* 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground, x,y, radius, vx, vy, color, speed,move_length);
        }
    }
    move_to(tx, ty){
        this.move_length = this.get_dist(this.x, this.y, tx,ty);

        let angle = Math.atan2(ty-this.y, tx- this.x);
        this.vx= Math.cos(angle);
        this.vy = Math.sin(angle);
    }
    update(){
        this.spent_time += this.timedelta/ 1000;
        if(this.spent_time > 5 &&Math.random() < 1 / 180.0 && !this.is_me){
            let player = this.playground.players[Math.floor(Math.random()*this.playground.players.length)];
            let tx = player.x + player.speed*player.vx * this.timedelta /1000* 0.3;
            let ty = player.y + player.speed*player.vy * this.timedelta /1000*0.3;
            this.shoot_fireball(tx, ty);
        }

        if(this.damage_speed > 10){
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.timedelta / 1000;
            this.y += this.damage_y * this.damage_speed * this.timedelta / 1000;
            this.damage_speed *= this.friction;
            //console.log("dealing collision");
        }
        else{
            if(this.move_length <this.eps){
                this.move_length=0;
                this.vx = this.vy = 0;
                if(!this.is_me){
                    let tx = Math.random()* this.playground.width;
                    let ty = Math.random()*this.playground.height;
                    this.move_to(tx,ty);
                }
            }
            else{
                let moved= Math.min(this.move_length, this.speed* this.timedelta / 1000);
                //console.log(moved);
                this.x += moved * this.vx;
                this.y += moved * this.vy;

                this.move_length -= moved;
            }

        }
        this.render();
    }

    render(){
        if(this.is_me){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2); 
            this.ctx.restore();
        }
        else{
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }

    on_destroy(){
        for(let i = 0;i<this.playground.players.length;i++){
            if(this.playground.players[i] === this){
                this.playground.players.splice(i,1);
            }
        }
    }
}
class FireBall extends AcGameObject{
    constructor(playground, player,x ,y , radius, vx, vy, color, speed,move_length, damage){
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.eps = 0.1;
        this.damage = damage;
        
    }
    
    start(){

    }

    update(){
        if(this.move_length < this.eps){
            this.destroy();
            return false;
        }
        let moved = Math.min(this.move_length, this.speed* this.timedelta/1000);

        this.x += this.vx*moved;
        this.y += this.vy*moved;
        this.move_length -= moved;
       

        for(let i =0;i<this.playground.players.length;i++){
            let player = this.playground.players[i];
            if(this.player !=player && this.is_collision(player)){
                this.attack(player);
            }
        }
        this.render();
    }
    
    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx*dx + dy*dy);
    }
    is_collision(player){
        let dist = this.get_dist(this.x, this.y, player.x, player.y);
        if(dist < player.radius + this.radius){
            return true;
        }
        else return false;
    }

    attack(player){
        let angle  = Math.atan2(player.y - this.y, player.x - this.x);
        //console.log("attack angle");
        
        player.is_attacked( angle ,this.damage);
        this.destroy();
    }
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    
}
class AcGamePlayground{
    constructor(root){
        this.root = root;
        this.$playground = $(`<div class ="ac-game-playground"></div>`);

        this.hide();
        
        this.start();
        
    }
    
    get_random_color(){
        let colors = ["blue", "red", "pink", "grey", "green"];
        return colors[Math.floor(Math.random()*5)];
    }
    start(){

    }

    show(){
        this.root.$ac_game.append(this.$playground);
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        
        this.game_map = new GameMap(this);
        this.players  = [];

        this.players.push(new Player(this, this.width/5, this.height/2, this.height*0.05,"white", this.height*0.15, true));
       
        //console.log("check 2");
        for(let i=0;i<5;i++){
            this.players.push(new Player(this, this.width/5 , this.height/2, this.height*0.05, this.get_random_color(), this.height*0.15,false));

        }
        this.$playground.show();
    }

    hide(){
        this.$playground.hide();
    }
}
export class AcGame{
    constructor(id, AcWingOS)
    {   
        console.log("check:1");
        this.id = id;
        this.AcWingOS = AcWingOS;
        this.$ac_game = $(`#`+id);
        this.settings = new Settings(this);
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);
        
        this.start();
    }
    

    start(){
    }

}

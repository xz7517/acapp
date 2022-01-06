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

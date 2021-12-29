class AcGame{
    constructor(id)
    {   
        console.log("check:");
        this.id = id;
        this.$ac_game = $(`#`+id);
        this.menu = new AcGameMenu(this);

    }
}

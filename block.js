//Jan 24 2017, original work
$(document).ready(function(){
        //Canvas shortcuts
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    //cell width and variables
    var cw = 20;
    var d;
    var score = 0;
    var lastScore;
    var dude;
    var nx;
    var ny;
    var bx;
    var by;
    var blocks=[];
    var level = 1; //starting level
    var finishText= ["!","!!","!","!!","!!!",", but you'll never escape..."];
    var codeText = ["FRST","LOOP","BOOM","BRID","TEDI","FREE"];
    var codeEntry = location.search.slice(location.search.indexOf("=")+1);

    function newBlock(x,y,color,pushable,solid,hole){
        this.x = x;
        this.y = y;
        this.color = color;
        this.isPushable = pushable;
        this.isHole = hole;
        this.isSolid = solid;
        this.isColission = function(x,y){
            if(this.isSolid && this.x === x && this.y === y){
                return true;
            }else{
                return false;
            }
        }
        this.fallDown = function(){
            this.color = "green"
            this.isSolid = false;
            this.isHole = false;
            score += 5;
        }
    }

    var createWall = function(x,y) {
        blocks.push(new newBlock(x,y,"gray",false,true,false));
    }

    var createBlock = function(x,y) {
        blocks.push(new newBlock(x,y,"chartreuse",true,true,false));
    }

    var createHole = function(x,y) {
        blocks.push(new newBlock(x,y,"black",false,true,true));
    }

    var createFinish = function(x,y) {
        blocks.push(new newBlock(x,y,"blue",false,true,false))
    }

    var checkColission = function(x,y){
        var dontPush = false;
        var onHole = -1;
        for(i=0; i<blocks.length; i++){
            if(blocks[i].isColission(x,y)){ //check colission between dude and block
                if(blocks[i].color === "blue") {
                    score += 10;
                    alert("You Win"+finishText[level-1]);
                    level++;
                    startGame(level);
                    return;
                }
                if(blocks[i].isPushable){ //check if pushable
                    for(j=0; j<blocks.length; j++){ 
                        if(bx === blocks[j].x && by === blocks[j].y && i !== j  && blocks[j].isSolid) {
                            if (blocks[j].isHole) {
                                onHole = j;
                            }else{
                                //future location is occupied
                                dontPush = true;
                            }
                        }

                    }
                    if(!dontPush){
                        //can push
                        blocks[i].x=bx;
                        blocks[i].y=by;
                        //check colission with hole after push
                        if(onHole > -1){
                            //make it fall down
                            blocks[onHole].fallDown();
                            blocks.splice(i,1);
                        }

                    }
                }
                return true; //tell guy not to move
            }
        }
    }

    var startGame = function(){
        blocks=[];
        if(level === 1){
            dude = [5,10];  
            for(i=3; i<20; i++){ //horizontal barriers
                createWall(i,5);
                createWall(i,13);
            }
            for(i=6; i<13; i++){ //vertical barriers
                createWall(3,i);
                createWall(19,i);
            }
            for(i=7; i<13; i++){ //vertical obstacle
                createWall(9,i);
                createWall(15,i);
            }
            for(i=10; i<15; i++){
                createWall(i,7);
            }
            createHole(10,6);
            createHole(14,6);
            createBlock(7,10);
            createBlock(7,7);
            createFinish(17,11);
        }else if (level === 2){
            dude = [11,10];
            for(i=3; i<13; i++){ //horizontal barriers
                createWall(i,5);
                createWall(i,16);
            }
            for(i=6; i<16; i++){ //vertical barriers
                createWall(3,i);
                createWall(12,i);
            }
            for(i=4; i<7; i++){
                createWall(i,9);
            }
            for(i=8; i<12; i++){
                createWall(i,9);
                createWall(i,11);
            }
            createWall(4,11);
            createWall(6,11);
            createWall(6,12);
            createWall(7,13);
            createWall(7,15);
            for(i=12; i<16; i++){
                createWall(9,i);
            }
            for(i=6; i<9; i++){
                createWall(6,i);
                createWall(8,i);
            }
            createHole(5,10);
            createHole(7,8);
            createHole(8,15);
            createBlock(7,10);
            createBlock(8,13);
            createBlock(6,14);
            createFinish(7,6);
        }else if (level === 3){
            dude=[4,6];
            for(i=3; i<18; i++){ //horizontal barriers
                createWall(i,5);
                createWall(i,16);
            }
            for(i=6; i<16; i++){ //vertical barriers
                createWall(3,i);
                createWall(17,i);
            }
            for(i=7; i<9; i++){
                createWall(i,6);
                createWall(i,8);
            }
            for(i=6; i<9; i++){
                createWall(12,i);
            }
            for(i=7; i<14; i++){
                createWall(i,9);
            }
            createWall(4,12);
            for(i=6; i<9; i++){
                createWall(i,12);
            }
            createWall(16,9);
            createWall(14,9);
            for(i=7; i<14; i++){
                createWall(i,11);
            }
            for(i=13; i<17; i++){
                createWall(i,12);
            }
            for(i=13; i<16; i++){
                createWall(8,i);
            }
            createHole(7,7);
            createHole(8,7);
            createHole(5,12);
            createHole(15,9);
            createBlock(5,7);
            createBlock(14,7);
            createBlock(15,7);
            createBlock(5,14);
            createBlock(6,14);
            createFinish(10,7);
        }else if(level === 4){
            dude=[5,10];
            for(i=3; i<16; i++){ //horizontal barriers
                createWall(i,5);
                createWall(i,18);
            }
            for(i=6; i<18; i++){ //vertical barriers
                createWall(3,i);
                createWall(15,i);
            }
            for(i=6; i<10; i++){
                createWall(7,i);
                createWall(11,i);
            }
            createWall(8,9);
            createWall(10,9);
            for(i=12; i< 15; i++){
                createWall(i,8);
            }
            for(i=7; i<9; i++){
                createWall(i,11);
                createWall(i+3,11);
                createWall(i+4,12);
            }
            createWall(14,12);
            for(i=4; i<8; i++){
                createWall(i,12);
            }
            for(i=14; i<17; i++){
                createWall(8,i);
                createWall(10,i);
            }
            createHole(9,9);
            createHole(9,11);
            createHole(9,13);
            createHole(9,17);
            createHole(7,17);
            createHole(11,17);
            createHole(13,12);
            createHole(11,13);
            createBlock(5,7);
            createBlock(7,15);
            createBlock(9,15);
            createBlock(11,15);
            createBlock(5,17);
            createBlock(13,17);
            createBlock(13,10);
            createFinish(9,7);
        }else if(level === 5){//tedi
            dude=[4,6];
            for(i=3; i<18; i++){ //horizontal barriers
                createWall(i,5);
                createWall(i,18);
            }
            for(i=6; i<18; i++){ //vertical barriers
                createWall(3,i);
                createWall(17,i);
            }
            for(i=7; i<10; i++){
                createWall(i,6);
                createWall(i,8);
            }
            for(i=6; i<9; i++){
                createWall(13,i);
            }
            for(i=7; i<14; i++){
                createWall(i,9);
                createWall(i,10);
            }
            for(i=4; i<8; i++){
                createWall(i,13);
            }
            createWall(16,9);
            createWall(14,9);
            for(i=7; i<14; i++){
                createWall(i,12);
            }
            for(i=13; i<15; i++){
                createWall(i,13);
            }
            createWall(13,12);
            for(i=11; i<15; i++){
                createWall(i,14);
            }
            for(i=13; i<15; i++){
                createWall(16,i);
            }
            for(i=15; i<18; i++){
                createWall(11,i);
            }
            createHole(7,7);
            createHole(8,7);
            createHole(9,7);
            createHole(15,13);
            createHole(15,14);
            createBlock(6,7);
            createBlock(15,6);
            createBlock(15,8);
            createBlock(13,16);
            createBlock(14,16);
            createBlock(15,16);
            createFinish(11,7);
        }else{//free
            dude = [10,10];
            for(i=5; i<16; i++){ //horizontal barriers
                createWall(i,5);
                createWall(i,15);
            }
            for(i=7; i<15; i++){ //vertical barriers
                createWall(5,i);
                createWall(15,i);
            }
            for(i=11; i<15; i++) {
                createWall(i,7);
            }
            createWall(15,6);
            createBlock(12,12);
            createHole(12,6);
            createHole(5,6);
            createFinish(14,6);
        }
        //inefficent for input based game
        /*if(typeof game_loop != "undefined") {
            clearInterval(game_loop);
        }
        game_loop = setInterval(paint, 60);*/
        console.log(level);
        nx = dude[0];
        ny = dude[1];
        lastScore = score;
        paint();
    }
    
    var paint = function() { //main game function: moves dude, resolves colissions, paints
        //move character
        if(d === "right") {
            nx = dude[0]+1;
            bx = nx+1;
            by = dude[1];
            d = "";
        }else if(d === "left") {
            nx = dude[0]-1;
            bx = nx-1;
            by = dude[1];
            d = "";
        }else if (d === "up") {
            ny = dude[1]-1;
            by=ny-1;
            bx = dude[0];
            d = "";
        }else if (d === "down") {
            ny = dude[1]+1;
            by=ny+1;
            bx = dude[0];
            d = "";
        }
        if (checkColission(nx,ny)) {
            console.log("COLLIDE");
            nx = dude[0];
            ny = dude[1];
        }else{
            dude[0]=nx;
            dude[1]=ny;
        }

        //paint the board
        ctx.fillStyle = "#444";
        ctx.fillRect(0,0,w,h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0,0,w,h);

        //paint objects
        for (i=0; i<blocks.length; i++){
            paintCell(blocks[i].x,blocks[i].y,blocks[i].color);
        }

        //paint the dude
        paintCell(dude[0],dude[1],"red");

        //paint text
        ctx.fillStyle="white";
        ctx.font="40px sans-serif";
        ctx.fillText("Score = "+score, 0, h-5);
        ctx.fillText("Level: "+level, 0, 0+40)
        ctx.fillText("Code: "+codeText[level-1], w/2-20, 0+40)
        ctx.font="10px sans-serif";
        ctx.fillText("Controls: Arrow keys, R to restart.", w-160, h-5);
    }

    var paintCell = function(x,y,color) {
        color = color || "blue";
        ctx.fillStyle = color;
        ctx.fillRect(x*cw, y*cw, cw, cw);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x*cw, y*cw, cw, cw);
    }

    //controls
    $(document).keydown(function(e){

        var key = e.which; console.log(key);
        if(key === 37) {
            d = "left";
        }else if(key === 38) {
            d = "up";
        }else if(key === 39) {
            d = "right";
        }else if(key === 40) {
            d = "down";
        }else if(key === 82) {
            score = lastScore;
            startGame(level);
        }
        paint();
    })

    //check for skipcode
    if(codeEntry !== "") {
        codeEntry = codeEntry.toUpperCase();
        for(i=0; i<codeText.length; i++) {
            if(codeText[i] === codeEntry) {
                level = i+1;
            }
        }
    }
    startGame(level);

})
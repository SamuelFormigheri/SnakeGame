//#region Global Variables
xMoveDirection = yMoveDirection = 0;
xPlayerPosition = yPlayerPosition = 10;
xApplePosition = yApplePosition = 15;
gs = tc = 20;
trail = [];
tail = 3;
score = 0;
scoreLabel = document.getElementById("score");
//#endregion

function game(){
    xPlayerPosition += xMoveDirection;
    yPlayerPosition += yMoveDirection;

    if(xPlayerPosition < 0){
        xPlayerPosition = tc - 1;
    }
    if(xPlayerPosition > tc - 1 ){
        xPlayerPosition = 0;
    }
    if(yPlayerPosition < 0){
        yPlayerPosition = tc - 1;
    }
    if(yPlayerPosition > tc - 1 ){
        yPlayerPosition = 0;
    }

    canvasContext.fillStyle="black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle="lime";
    for(var i = 0; i < trail.length; i++){
        canvasContext.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2);
        //Player hit his own trail, so the game restart with tail = 3
        if(trail[i].x == xPlayerPosition && trail[i].y == yPlayerPosition){
            tail = 3;
            score = 0;
            scoreLabel.innerHTML = score;
        }
    }

    trail.push({x : xPlayerPosition, y : yPlayerPosition});
    while(trail.length > tail){
        trail.shift();
    }

    //Player hit the apple
    if(xApplePosition == xPlayerPosition && yApplePosition == yPlayerPosition){
        tail++;
        score++;
        scoreLabel.innerHTML = score;
        xApplePosition = Math.floor(Math.random()* tc);
        yApplePosition = Math.floor(Math.random()* tc);
    }
    canvasContext.fillStyle="red";
    canvasContext.fillRect(xApplePosition*gs, yApplePosition*gs, gs-2, gs-2);
}

function moveSnake(event){
    switch(event.keyCode){
        //Key Arrow Left
        case 37: 
            xMoveDirection = -1;
            yMoveDirection = 0;
            break;
        //Key Arrow Up
        case 38:
            xMoveDirection = 0;
            yMoveDirection = -1;
            break;
        //Key Arrow Right    
        case 39:
            xMoveDirection = 1;
            yMoveDirection = 0;
            break;
        //Key Arrow Down    
        case 40:
            xMoveDirection = 0;
            yMoveDirection = 1;
            break;   
    }
}


window.onload = function setGameStart(){
    //Get the board
    canvas = document.getElementById("canvas");
    //Get the context of the board
    canvasContext = canvas.getContext("2d");
    //Adding the events of pressing a key
    document.addEventListener("keydown", moveSnake);
    //Set interval that calls the function game
    setInterval(game,70);
}
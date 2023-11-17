let GameManager=(function(){

 let gameBoard=[];


 let createBoard=(()=>{
    
    for(i=0;i<3;i++){
        gameBoard[i]=[]
        for (let x = 0; x <3; x++) {
            
            gameBoard[i][x]="_";

        }
        
 }
 
 


 })();


 let play=(row=0,column=0,token)=>{
    
        
     gameBoard[row][column]=token;



 }

function restart(){
for (let i = 0; i < 3; i++) {
   for (let x = 0; x < 3; x++) {

    GameManager.gameBoard[i][x]='_';
    
   }
    
}




}

 return {gameBoard,play,restart};
    }





)();





let Player=(function() {

let playerMaker=(name,token)=>{


    return{name,token}
}

let User=playerMaker("Reece","X");
let Computer=playerMaker("computer","O");

let opponents=[User,Computer];

let SwitchPlay=()=>{

    let tempKeeper=opponents[0];
    opponents[0]=opponents[1];
    opponents[1]=tempKeeper;

}

let RunningPlayer=()=>{
 
    return opponents[0];
}






SwitchPlay();


return{SwitchPlay,RunningPlayer,User,Computer}

    
})();


let Move=(function(){

let selection=(row=1,column=1)=>{
    if(GameManager.gameBoard[row][column]==="0"||GameManager.gameBoard[row][column]==="X"||row>2||row<0||column<0||column>2){

        console.log("Wrong Entry");

            return;
    }
    GameManager.play(row,column,Player.RunningPlayer().token);
    Player.SwitchPlay();


};



let Engange=function(row,column){
    var positonsFilled=0;
    selection(row,column);
    
 

    for (let i = 0; i < 3; i++) {
        for (let x = 0; x < 3; x++) {
            if(GameManager.gameBoard[i][x]==="X"||GameManager.gameBoard[i][x]==="O"){

                positonsFilled++;
                if(positonsFilled>2&&positonsFilled<9){
                    (Move.DertimineWinner());
                   let playStatus=Move.DertimineWinner();
                 console.log(playStatus);
                  
                   if(!((playStatus.WinnerStatus)===undefined)){

                    cacheDom.printOut(playStatus.WinnerStatus,playStatus.mark);
                    return;
                    // console.log(  cacheDom.printOut(playStatus.WinnerStatus,playStatus.mark))
                    
                   
                   }
                }
                else if(positonsFilled>8){

                    cacheDom.printOut("Its A Tie");
                    return;
                }

            }
            
        }
   
    } 
 


      
       
      
        
        
   


}

//fix this
let DertimineWinner=(()=>{

    //the vertical move
for (let i = 0; i <3; i++) {
  
      if((GameManager.gameBoard[i][0]===GameManager.gameBoard[i][1])&&(GameManager.gameBoard[i][0]===GameManager.gameBoard[i][2])){

        if (!(GameManager.gameBoard[i][0]==="_")) {

            let mark=GameManager.gameBoard[i][0];
            let WinnerStatus="Winner is "+GameManager.gameBoard[i][0];
            
            return {mark,WinnerStatus};
            
        }

      }
    
    
}

//the horizontal moves
for (let i = 0; i <3; i++) {
  
    if((GameManager.gameBoard[0][i]===GameManager.gameBoard[1][i])&&(GameManager.gameBoard[0][i]===GameManager.gameBoard[2][i])){

        console.log("===>"+GameManager.gameBoard[i][0])
      if (!(GameManager.gameBoard[0][i]==="_")) {

        let mark=GameManager.gameBoard[1][i];
        let WinnerStatus="Winner is "+GameManager.gameBoard[1][i];
          return{mark,WinnerStatus};
          
      }

    }
  
  
}
   
//the crossectional move -neagtive line
if ((GameManager.gameBoard[0][0]===GameManager.gameBoard[1][1])&&(GameManager.gameBoard[0][0]===GameManager.gameBoard[2][2])) {

    if (!(GameManager.gameBoard[0][0]==="_")) {

        let mark=GameManager.gameBoard[0][0];
        let WinnerStatus="Winner is "+GameManager.gameBoard[0][0];
          return{mark,WinnerStatus};

        
    }

   //the crossectional move -positive line 
} else if ((GameManager.gameBoard[0][2]===GameManager.gameBoard[1][1])&&(GameManager.gameBoard[0][2]===GameManager.gameBoard[2][0]))  {
    if (!(GameManager.gameBoard[0][2]==="_")) {

        let mark=GameManager.gameBoard[0][2];
        let WinnerStatus="Winner is "+GameManager.gameBoard[0][2];
          return{mark,WinnerStatus};

       
        
    }
}

return {mark:undefined,WinnerStatus:undefined}
})

return {Engange,DertimineWinner}    
})();








let cacheDom=(()=>{

let positionButton=(row,column,button)=>{

    let getCordinates=()=>{
        let xCordinate=row;
        let yCordinate=column;
        return {xCordinate,yCordinate}
    }
    

    
    return{row,column,button,getCordinates}
}

let setMaker=(()=>{
    let box=document.querySelector(".board");

        for ( i = 0; i <3; i++) {

            for (let x = 0; x < 3; x++) {
                
                let square=document.createElement('button');
                square.classList.add('square');
                square.id="square";
                box.append(square);
                square.textContent="   ";
                square.disabled=0;
                let value=positionButton(i,x,square);
                
                square.addEventListener('click',(e)=>{
                    
                 ManipulateSquare(value.row,value.column,square);

                })
              

              
                
            }
            
        }



})();

function ManipulateSquare(row,column,square){



    Move.Engange(row,column)
                 square.textContent=GameManager.gameBoard[row][column];
                 console.log(GameManager.gameBoard);
                 square.disabled=true;
            

}

let result=(()=>{

    let dialog=document.querySelector('#endGame');
    let collectButton=document.querySelectorAll('#square');

    
    let TryAgain=document.querySelector('#TryAgain');
    
    TryAgain.addEventListener('click',function(e){
    
    GameManager.restart();
    dialog.close();
    cleanUp(collectButton);
    
    })
    
    return{dialog};
    })();

let xWins=0;
let oWins=0;
function printOut(words,spot=undefined) {
     
    
    let text=document.querySelector('p');
    result.dialog.showModal();
  
    //points sent to array
    if (spot==="X") {
        text.textContent=`Winner is ${Player.User.name}`
        xWins++;
    }
    else if(spot==="O"){
        text.textContent=`Winner is ${Player.Computer.name}`
        oWins++;
    }
    else{

        text.textContent=words
    }
}

function cleanUp(buttons){

 for (let i = 0; i < buttons.length; i++) {
 buttons[i].textContent=" ";
    buttons[i].disabled=false;
 }


}

function Quit() {
    let finishbox=document.querySelector('#finishBox');
    let pointsPlayerX=document.querySelector('#finishBox div:first-child>p');
    let pointsPlayerO=document.querySelector('#finishBox div:last-child>p');
    finishbox.showModal();

    let PlayerNameX=document.querySelector('#finishBox div:first-child>h3');
    let PlayerNameO=document.querySelector('#finishBox div:last-child>h3');

    PlayerNameX.textContent=Player.User.name;
    PlayerNameO.textContent=Player.Computer.name;
    pointsPlayerX.textContent=xWins;
    pointsPlayerO.textContent=oWins;
}

let quit=document.querySelector('#endGame button:first-child');

quit.addEventListener('click',(e)=>{

    Quit();
})

let submit=document.querySelector('[type=submit]');
let XplayerInput=document.querySelector('#PlayerX');
let OplayerInput=document.querySelector('#PlayerO');

submit.addEventListener('click',(e)=>{

   playerDetails(XplayerInput.value,OplayerInput.value);
})

function playerDetails(playerX,PlayerO){

Player.User.name=playerX;
Player.Computer.name=PlayerO;


}





return{printOut}
})();




  

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

 return {gameBoard,play};
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


return{SwitchPlay,RunningPlayer}

    
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

                    Move.DertimineWinner();
                }
                else if(positonsFilled>8){

                    alert("basi Man")

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

            console.log("Winner is "+GameManager.gameBoard[i][0])
            return;
        }

      }
    
    
}

//the horizontal moves
for (let i = 0; i <3; i++) {
  
    if((GameManager.gameBoard[0][i]===GameManager.gameBoard[1][i])&&(GameManager.gameBoard[0][i]===GameManager.gameBoard[2][i])){

        console.log("===>"+GameManager.gameBoard[i][0])
      if (!(GameManager.gameBoard[0][i]==="_")) {

          console.log("Winner is "+GameManager.gameBoard[1][i])
          
      }

    }
  
  
}
   
//the crossectional move -neagtive line
if ((GameManager.gameBoard[0][0]===GameManager.gameBoard[1][1])&&(GameManager.gameBoard[0][0]===GameManager.gameBoard[2][2])) {

    if (!(GameManager.gameBoard[0][0]==="_")) {

        console.log("Winner is "+GameManager.gameBoard[0][0])
        
    }

   //the crossectional move -positive line 
} else if ((GameManager.gameBoard[0][2]===GameManager.gameBoard[1][1])&&(GameManager.gameBoard[0][2]===GameManager.gameBoard[2][0]))  {
    if (!(GameManager.gameBoard[0][2]==="_")) {

        console.log("Winner is "+GameManager.gameBoard[0][2])
        
    }
}


})

return {selection,Engange,DertimineWinner}    
})();


let cacheDom=(()=>{
//move this to Move obj
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
                square.textContent="Drizzy"+i+x;
                square.disabled=0;
                let value=positionButton(i,x,square);
                
                square.addEventListener('click',(e)=>{
                    
                 Move.Engange(value.row,value.column)
                 square.textContent=GameManager.gameBoard[value.row][value.column];
                 console.log(GameManager.gameBoard);
                 square.disabled=1;

                })
              

              
                
            }
            
        }



})();






})();





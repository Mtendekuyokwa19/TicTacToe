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

let Engange=function(){

    // for (let i = 0; i <9; i++) {
       
        Move.selection(0,0);

        Move.selection(1,1);
       
        Move.selection(0,1);

        Move.selection(0,2);
       

        Move.selection(1,2);
        Move.selection(1,0);
        Move.selection(2,1);
      
        Move.selection(2,0);
       
       return Move.Winner();
        
        
    // }


}


let Winner=(()=>{

    for (let i = 0; i <3; i++) {

        console.log("we reached");
        
        if ((GameManager.gameBoard[i][0]===GameManager.gameBoard[i][1])&&GameManager.gameBoard[i][0]===GameManager.gameBoard[i][2]) {
            
                alert("WInner is "+GameManager.gameBoard[i][1])

                return;

        } 
        
    }


    for (let i = 0; i <3; i++) {

        console.log("Richer");
        
       
        if ((GameManager.gameBoard[0][i]===GameManager.gameBoard[1][i])&&GameManager.gameBoard[0][i]===GameManager.gameBoard[2][i]){
            
                alert("HAHAHA is "+GameManager.gameBoard[0][i])

                return;

        } 
        
    }

    if((GameManager.gameBoard[0][0]===GameManager.gameBoard[1][1])&&(GameManager.gameBoard[0][0]===GameManager.gameBoard[2][2])){

        alert("HAHAHA is "+GameManager.gameBoard[0][0]);

    }
    else if((GameManager.gameBoard[0][2]===GameManager.gameBoard[1][1])&&(GameManager.gameBoard[0][2]===GameManager.gameBoard[2][0]))
{
    // console.log(s)
    alert("HAHAHA is "+GameManager.gameBoard[0][2]);


} 
var count=0;
for (let index = 0; index < 3; index++) {
    for (let x = 0; x < 3; x++) {
        if(GameManager.gameBoard[index][x]==="X"||GameManager.gameBoard[index][x]==="O"){

            count++;

        }
        
    }
    
}

if (count>8) {
  
    alert("Its a tie");
    
}

})

return {selection,Engange,Winner}    
})();

console.log(GameManager.gameBoard);

Move.Engange();





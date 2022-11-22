const score=document.querySelector(".score");
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');

//console.log(startScreen);
startScreen.addEventListener('click', startGame)
// key press and unpress
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
//console.log(score)

let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
   a:false,
   s:false,
   d:false,
   w:false
};
//let keys2={
//    a:false,
//    s:false,
//    d:false,
//    w:false
//};
function keyDown(e){
   // e.preventDefault();
   // console.log(e.key);
    keys[e.key]=true;
   // keys2[e.key]=true;
   // console.log(keys)
}
function keyUp(e){
   // e.preventDefault();
   keys[e.key]=false;
   //keys2[e.key]=false;
    //console.log(e.key);
}



let carXY=document.querySelector('.car1');
let player={ speed:5, score:0 , maxScore:0,lineSpeed:3};
let pScore=document.querySelector('.score');
let maxscore=document.querySelector('.maxScore');
let road=gameArea.getBoundingClientRect();
/////////////////////////////////////////////////////// cheaking collision of fast car
 function isfastCarCollide(pCar,fCar){
    let fRect=fCar.getBoundingClientRect();
    let pRect=pCar.getBoundingClientRect();
    return  !((pRect.left>fRect.right-5)||(pRect.right-5<fRect.left)||(pRect.top>fRect.bottom-5)||(pRect.bottom-5<fRect.top));
 }
//////////////////////////////////////////////////////// Cheaking collission of car
function isCollide(pCar,eCar,fCar){
   let pRect=pCar.getBoundingClientRect();
   let eRect=eCar.getBoundingClientRect();
   return !((pRect.left>eRect.right-5)||(pRect.right-5<eRect.left)||(pRect.top>eRect.bottom-5)||(pRect.bottom-5<eRect.top));
}

////////////////////////////////////////////////////////////moving road lines
function moveLines(){
    let lines=document.querySelectorAll('.line');
   // console.log(lines);
  lines.forEach(function(element) {
      if(element.y>=road.bottom){
          element.y=(road.top);
      }
             element.y+=player.lineSpeed ;
         element.style.top=element.y+"px";
      });
 
}
///////////////////////////////////////////////////////  game end
function gameEnd(){
    player.start=false;
    startScreen.classList.remove('hide');
    maxscore.innerHTML="Max Score:"+player.maxScore;
}
//////////////////////////////////////////////////////////////////move fast car
function moveFastCar(car){
    let fastCar=document.querySelector('.fastCar');
    //console.log(fastCar)
    if(fastCar.y>=road.bottom){
        fastCar.y=road.top-3000;
        fastCar.style.top=fastCar.y+"px";
        fastCar.style.left=(Math.random()*350)+"px";
    }
    else{
        fastCar.y+=player.speed+2;
        fastCar.style.top=fastCar.y+"px";
    }
    if(isfastCarCollide(car,fastCar))
    {
        player.maxScore=(player.maxScore>player.score)?player.maxScore:player.score;
        gameEnd();
    }
}
//////////////////////////////////////////////////////////////////move enemy car
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if( isCollide(car,item)){
            //console.log("collission");
            player.maxScore=(player.maxScore>player.score)?player.maxScore:player.score;
            gameEnd();
            
        }
          if(item.y>=road.bottom){
              item.y=-300;//car distance one to other
              item.style.left=(Math.random()*350)+"px";
              //item.y+=player.speed;
            //item.style.top=item.y+"px";
          }
         // item.style.left=(Math.random()*350)+"px";
            item.y+=player.speed;
            item.style.top=item.y+"px";
    });
}
//////////////////////////////////////////////////////////////////game play
function gamePlay(){
    //console.log(player.x,player.y)
    let carXY=document.querySelector('.playerCar');
    //let road=gameArea.getBoundingClientRect();  //defined outside globly
   // console.log(road)
   // console.log(carXY);
    if(player.start){
        //console.log("playing");
        moveLines();
        moveEnemy(carXY);
        moveFastCar(carXY);
    ////// moving car by arrow keys 
        if(keys.ArrowUp && (player.y)>(70)) //(road.top+70))
            { player.y-=player.speed ;}
        if(keys.ArrowDown && (player.y ) <= (road.bottom-70))
            { player.y+=player.speed;}
        if(keys.ArrowLeft && player.x>0)
            { player.x-=player.speed ; }
        if(keys.ArrowRight && (player.x)<(road.width-50))
            { player.x+=player.speed; }
////// moving car by a s d w key
        if(keys.w && (player.y)>(70)) //(road.top+70))
        { player.y-=player.speed ;}
        if(keys.s && (player.y ) <= (road.bottom-70))
        { player.y+=player.speed;}
        if(keys.a && player.x>0)
        { player.x-=player.speed ; }
        if(keys.d && (player.x)<(road.width-50))
        { player.x+=player.speed; }
         
    carXY.style.top=player.y +"px";
    carXY.style.left=player.x +"px";
    window.requestAnimationFrame(gamePlay); 
   // console.log(player.score++);
        pScore.innerHTML="Score"+":"+player.score;
        player.score++;
         }
}
//////////////////////////////////////////////////////////////////start game
function startGame(){
   // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML=" ";
      player.start=true; 
      player.score=0;
   
///// creating  5 road line 
   for(let x=0;x<7;x++){
   let roadLine=document.createElement('div');
   roadLine.setAttribute('class','line');
   roadLine.y=(x*(road.height/7));
   roadLine.style.bottom=roadLine.y+"px";
   roadLine.style.height=((road.height/7)-50)+"px";
   gameArea.appendChild(roadLine);
     }
  // let linesHight=document.querySelectorAll('.line');
   //linesHight.forEach(function(element){
    //element.style.height=((road.height/5)-50)+"px";});

//////// creating fast car   
       let fastCar=document.createElement('div');
       fastCar.setAttribute('class','fastCar');
       fastCar.y=road.top-70;
       fastCar.style.top=fastCar.y+"px";
       fastCar.style.left=(Math.random()*350)+"px";
       gameArea.appendChild(fastCar);
//////creating 3 enemy car
for(let x=0;x<3;x++){
    let enemyCar=document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y=((x+1)*300)*-1;  //giving postion in y with negative value so that
    enemyCar.style.top=enemyCar.y+"px";//car car not generate at middle of road (for 1st time)
    enemyCar.style.left=(Math.random()*350)+"px";
    //enemyCar.style.backgroundColor=randomColor();
   // enemyCar.style.backgroundImage="url('images/car2.png')"
    gameArea.appendChild(enemyCar);
     }
///creating player car and adding  into gameArea class 
let car=document.createElement('div');
   car.setAttribute('class','playerCar');
   car.style.bottom=100+"px";
   car.style.left=Math.floor(Math.random()*350)+"px";
  // car.innerText="hello car is created";
   gameArea.appendChild(car);
   

   player.x =car.offsetLeft //carXY.style.left.value;//car.offsetLeft;
   player.y =car.offsetTop //carXY.style.top.value; //car.offsetTop;
  // console.log(player.x);
  // console.log(player.y);
   window.requestAnimationFrame(gamePlay); 
}
///////////////////////////////////////////////////////////generating random color
//function randomColor(){
//    function c(){
//      let hexValue="0"+(Math.random()*256).toString(16);
//      return hexValue.substring(-2);
//    }
//    return "#"+c()+c()+c();
//}

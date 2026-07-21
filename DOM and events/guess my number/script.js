"use strict";
let secretNumber=Math.trunc(Math.random()*20)+1;
// random generates a random number between 0 and 1 , *20 will generate it between 0and 19.999999 , trunc will remove the decimal part and then it will generate till 0 to 19 so +1 for 20
let highscore=0;
let score=20;
document.querySelector('.check').addEventListener('click',function(){
    const guess=Number(document.querySelector('.guess').value);
    if(!guess){
        document.querySelector('.message').textContent='😒 No Number!'
    }else if(guess===secretNumber){
        document.querySelector('.message').textContent='🎉 Correct Number';
        document.querySelector('body').style.backgroundColor='green';
        document.querySelector('.number').style.width='30rem';
        document.querySelector('.number').textContent=secretNumber;
        if(score>highscore){
            highscore=score;
            document.querySelector('.highscore').textContent=highscore;
        }
    }else if(guess>secretNumber){
        if(score>1){
            document.querySelector('.message').textContent='📈 Too High';
            score--;
            document.querySelector('.score').textContent=score;
        }else{
            document.querySelector('.message').textContent='☹️ You Lost The Game!';
            document.querySelector('body').style.backgroundColor='red';
            score=0;
            document.querySelector('.score').textContent=score;

        }
    }else if(guess<secretNumber){
        if(score>1){
            document.querySelector('.message').textContent='📉 Too Low';
            score--;
            document.querySelector('.score').textContent=score;
        }
        else{
            document.querySelector('.message').textContent='☹️ You Lost The Game!';
            document.querySelector('body').style.backgroundColor='red';
            score=0;
            document.querySelector('.score').textContent=score;

        }
    }
});
document.querySelector('.again').addEventListener('click',function(){
    score=20;
    secretNumber=Math.trunc(Math.random()*20)+1;
    document.querySelector('.number').textContent='?';
    document.querySelector('.score').textContent=score;
    document.querySelector('.guess').value='';
    document.querySelector('body').style.backgroundColor='#222'
    document.querySelector('.message').textContent='Start guessing...';
});
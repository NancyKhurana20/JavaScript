'use strict';
const score0El=document.querySelector('#score--0');
const score1El=document.querySelector('#score--1');
const diceEl=document.querySelector('.dice');
let score0=Number(score0El.textContent);
let score1=Number(score1El.textContent);
score0=0;
score1=0;
score0El.textContent=score0;
score1El.textContent=score1;
diceEl.classList.add('hidden');
let currentScore0=0;
let currentScore1=0;
const current0El=document.getElementById('current--0');
const current1El=document.getElementById('current--1');

const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');

const btnNew=document.querySelector('.btn--new');
const btnHold=document.querySelector('.btn--hold');
const btnRoll=document.querySelector('.btn--roll');
btnRoll.addEventListener('click',function(){
    //generating a random number of dice
    const dice=Math.trunc(Math.random()*6)+1;

    //display dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;

    //check for dice roll if it is 1 or not
    if(dice!==1){
        //Add dice to the current score
        if(player0El.classList.contains('player--active')){
            currentScore0+=dice;
            current0El.textContent=currentScore0;
        }else if(player1El.classList.contains('player--active')){
            currentScore1+=dice;
            current1El.textContent=currentScore1;
        }
        
    }else{
        if(player0El.classList.contains('player--active')){
            player0El.classList.remove('player--active');
            player1El.classList.add('player--active');
            currentScore0=0;
            current0El.textContent=currentScore0;
        }else if(player1El.classList.contains('player--active')){
            player1El.classList.remove('player--active');
            player0El.classList.add('player--active');
            currentScore1=0;
            current1El.textContent=currentScore1;
        }
    }
})
btnHold.addEventListener('click',function(){
    if(player0El.classList.contains('player--active')){
        player0El.classList.remove('player--active');
        player1El.classList.add('player--active');
        score0+=currentScore0;
        score0El.textContent=score0;
        currentScore0=0;
        current0El.textContent=currentScore0;
    }else if(player1El.classList.contains('player--active')){
        player1El.classList.remove('player--active');
        player0El.classList.add('player--active');
        score1+=currentScore1;
        score1El.textContent=score1;
        currentScore1=0;
        current1El.textContent=currentScore1;
    }
    if(score0>=20){
    player0El.classList.add('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--active');
    diceEl.classList.add('hidden');

    
}else if(score1>=20){
    player1El.classList.add('player--winner')
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');

}
})
btnNew.addEventListener('click',function(){
    score0=0;
    score1=0;
    currentScore0=0;
    currentScore1=0;
    score0El.textContent=score0;
    score1El.textContent=score1;
    current0El.textContent=currentScore0;
    current1El.textContent=currentScore1;

    diceEl.classList.add('hidden');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    if(player1El.classList.contains('player--winner')){
        player1El.classList.remove('player--winner');
    }else if(player0El.classList.contains('player--winner')){
        player0El.classList.remove('player--winner');
    }
})


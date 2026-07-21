'use strict';
//currently the window which should be open is closed , its code is in same html but using css we have done the display class none , so whenever hidden class will be present then we will not be able to see the part inside it also we can specify display = block to show the hidden part , but we do not prefer that method
const showModal=document.querySelectorAll('.show-modal');
const modal=document.querySelector('.modal');
const btnCloseModal=document.querySelector('.close-modal');
const overlay=document.querySelector('.overlay');

const openModal=function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    //this will remove the class hidden of this element so the hidden class will be removed from here so now all the styles which was in hidden class will not be included so if in hidden class we have set the display none option then it will not be executed so the box will be displayed
    //and in overlay the remaining part the background will be blurred
}
const closeModal=function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
for(let i=0;i<showModal.length;i++){
    // console.log(showModal[i].textContent);
    showModal[i].addEventListener('click',function(){
        openModal();
    });
}
btnCloseModal.addEventListener('click',closeModal)
overlay.addEventListener('click',closeModal)

document.addEventListener('keydown',function(e){
    if(e.key==='Escape' && !modal.classList.contains('hidden')){
        closeModal();
    }
})
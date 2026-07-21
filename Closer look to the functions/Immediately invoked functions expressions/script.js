//functions that disappears right after calling it once , it is only executed once
const runOnce = function () {
  console.log("this will never run again");
};
runOnce(); //this function can be called multiple times also , so this is not what we want

(function () {
  console.log("This will never run again");
  const isPrivate = 23; //this can be accessed only inside this function scope , this data is private , data encapsulation
})(); //by this way it will only run once

(() => console.log("This will never run again"))();


{
    const isPrivate=23;
    var notPrivate=46;
}
//console.log(isPrivate); //this cannot be access outside this {} scope , but with var variable it can be accessed
console.log(notPrivate);
//Activating strict mode
"use strict"; //helps tell the error in our code in the console

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("i can drive");

//Functions
function logger() {
  console.log("My name is nancy");
}
//function call / running / invoking a function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}

const appleJuice = fruitProcessor(3, 5);
console.log(appleJuice);
console.log(fruitProcessor(5, 6));

//Function declaration VS expressions
//Function declaration
//In function declaration we can also first call them then declare
function calAge1(birthYear) {
  // const age= 2026-birthYear;
  // return age;
  return 2026 - birthYear;
}
const age1 = calAge1(1991);
console.log(`Your age is ${age1} years`);

//Function expression
//In function expression we cannot first call
//function without name annoymous function
const calAge2 = function (birthYear) {
  return 2026 - birthYear;
};
const age2 = calAge2(1991);
console.log(age1, age2);

//Arrow functions
const calAge3 = (birthYear) => 2037 - birthYear; //2037-birthYear this value will automatically be returned
const age3 = calAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age4 = 2037 - birthYear;
  const retirement = 65 - age4;
  // return retirement;
  return `${firstName} retires in ${retirement}`;
};
console.log(yearsUntilRetirement(1991, "Jonas"));

//Function calling another function
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessors(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`;
  return juice;
}
console.log(fruitProcessors(5, 6));

//Coding challenge
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
const scoreDolphins = calcAverage(44, 23, 71);
const scoreKoalas = calcAverage(65, 54, 49);
function checkWinner(avgDolphins, avgKoalas) {
  if (scoreDolphins >= 2 * scoreKoalas) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (scoreKoalas >= 2 * scoreDolphins) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log("No team wins...");
  }
}
checkWinner(scoreDolphins, scoreKoalas);

const scoreDolphins2 = calcAverage(85, 54, 41);
const scoreKoalas2 = calcAverage(23, 34, 27);

checkWinner(scoreDolphins2, scoreKoalas2);

//Arrays
const friends = ["Nancy", "Tanmay", "Prapti", "Muskan"];
console.log(friends);

const years = new Array(1991, 1989, 1990, 2002);
console.log(years);

console.log(friends[0], friends[1]);
console.log(friends.length);
console.log(friends[friends.length - 1]);
friends[2] = "Kashvi";
console.log(friends);

const nancy = ["nancy", "khurana", 2026 - 2006, friends];
console.log(nancy);

const calAge4 = function (birthYear) {
  return 2026 - birthYear;
};
const Years = [1990, 1998, 1980, 2003];
console.log(calAge4(Years[0]), calAge4(Years[1]), calAge4(Years[2]));

//Basic Array operations (methods)
const friend = ["Nancy", "Tanmay", "Prapti", "Muskan"];
friend.push("Kashvi"); //adds element at the end of the array
console.log(friend);
friend.unshift("Ishu"); //adds element at the start of the array
console.log(friend);
friend.pop(); //last element is removed
console.log(friend);
friend.shift(); //removes first element
//push and pop is also a function that also returns the value of length of the array so if we save it in the variable it will give length
console.log(friend);

console.log(friend.indexOf("Nancy"));
console.log(friend.indexOf("kashvi")); //-1 if element is not present

console.log(friend.includes("Nancy")); //return true or false
//includes have strict equality if string '23' is present in the array but number 23 is not then it will show false

// Simple Array Methods
// let arr = ["a", "b", "c", "d", "e"];

// SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// SPLICE
// console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// REVERSE
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse());
// console.log(arr2);

// CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// JOIN
// console.log(letters.join(" - "));

// The new at Method
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// // console.log(arr.at(-1));

// console.log("jonas".at(0));
// console.log("jonas".at(-1));

//Objects
//array can be used in order or can access using order , object cannot
const Nancy = {
  firstName: "Nancy",
  lastName: "Khurana",
  age: 2026 - 2006,
  friends: ["tanmay", "muskan", "prapti"],
};
console.log(Nancy);

//Dot Vs Bracket notation
//DOT notation
console.log(Nancy.lastName);
//Bracket notation
console.log(Nancy["lastName"]);

const nameKey = "Name";
console.log(Nancy["first" + nameKey]);
//in square bracket we can write any expression but it wont work in the dot notation

// const interestedIn=prompt('What do you want to know about nancy? choose between firstname lastname age and friends');
// console.log(interestedIn);
// console.log(Nancy.interestedIn); //this will show undefined
// console.log(Nancy[interestedIn]); //this will work
// //if the value entered in not in the object then it will show undefined and undefined is a falsy value so it return false so we will handle it using if else
// if(Nancy[interestedIn]){
//     console.log(Nancy[interestedIn]);
// }else {
//     console.log('Wrong request!');
// }

Nancy.location = "India";
Nancy["Instagram"] = "nancyk";
console.log(Nancy);
console.log(
  `${Nancy["firstName"]} has 4 friends but her bestf is ${Nancy.friends[0]}`,
);

//Object methods
const myinfo = {
  first: "nancy",
  last: "khurana",
  birthYear: 2006,
  friend: ["tanmay", "kashvi", "muskan"],
  calcAge: function (birthYear) {
    return 2026 - birthYear;
  },
};
console.log(myinfo.calcAge(2006));
console.log(myinfo["calcAge"](2006));

//birthyear is already present in the myinfo object so we dont need to again pass it
//second method --> make the use of this keyword
const myinfo2 = {
  first: "nancy",
  last: "khurana",
  birthYear: 2006,
  friend: ["tanmay", "kashvi", "muskan"],
  calcAge: function () {
    // console.log(this); //this will print the whole object
    // we can also add new properties using this
    // this.age= 2026- this.birthYear;
    return 2026 - this.birthYear;
  },
  getSummary: function () {
    console.log(`${this.first} is a student`);
  },
};
console.log(myinfo2.calcAge());
console.log(myinfo2.getSummary());

//Loops
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep}`);
}
//loops , break , continue , using array in the loop
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}
//while loop
let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep}`);
  rep++;
}
// cl for console.log

let js = "amazing";
// if (js === "amazing") alert("Javascript is fun");
console.log(40 + 8 + 23 - 10);

// Values and Variables
console.log("Nancy") //nancy is the value here
let firstName="Nancy"; //firstname is the variable 
console.log(firstName);

//Data types
/* Primitive data types
   1)Number: floating point nos let age=23;
   2)String: Sequence of characters let firstName="Nancy";
   3)Boolean: true or false let fullAge=true;
   4)Undefined: value taken by the variable that is not yet defined("empty value")
   5)Null: also means 'empty value'
   6)Symbol: Value that is unique and cannot be changed[not useful for now]
   7)BigInt: Larger integer than the number type can hold
    js have dynamic typing: we do not have to manually define the datatype of the value stored in variable , datatypes are determined automatically
*/ 
let javascriptIsFun=true;
console.log(javascriptIsFun);
console.log(typeof true);   //boolean
console.log(typeof 23);     //number
console.log(typeof "nancy"); //string

let year;
console.log(year);  //undefined
console.log(typeof year); //undefined

year=1991;
console.log(year);

console.log(typeof null); //it is shown as object but it is error it is not an object

//LET , CONST AND VAR
let age=30;
age=31; //by using let we can change the value means it is mutable

const birthYear=1991;
//birthYear=1990; // const value cannot be changed , immutable , this is will show error
//const job;// also const value cannot be empty

var job="programmer";
job="teacher" //mutable

//Basic operators
console.log(2**3); // 2^3

const firstname="nancy";
const lastname="khurana";
console.log(firstname+" "+lastname); //concatenation

let x=10+5;
console.log(x);

//comparision operator
console.log(2>3); //return true or false >,<,>=,<=

//Strings and template literals
const myname="nancy"
const intro="I'm "+myname;
console.log(intro);

//template literals
const myintro=`I'm ${myname}`;
console.log(myintro);

console.log(`Just a regular string...`);

//template literals to create multiline strings
console.log('String with \n\
    multiple \n\
    line');
console.log(`String with
    multiple 
    line`);

//Taking Decision: if/else statement else if 
const age1=19;
const isOldEnough= age>=18;

if(isOldEnough){
    console.log("Sarah can start driving license");
}
else{
    console.log("Not eligible for driving license");
}

//Type conversion and Coercion
const inputyear='1991';
console.log(inputyear+18); //this will give 199118 , will not perform the operation on string
console.log(Number(inputyear)); //this will convert it into the number but original string will remain the same
console.log(Number(inputyear)+18);
console.log(Number("Nancy")); //this will give NaN means not a number
console.log(String(23)); 
//type coercion
// value is converted into a string if we use + operator but in case of the operator (-*/) they will convert the string into the number and will give the result accordingly
let value='5'+5; //THIS WILL GIVE US 55
let value2='5'-5 // this will give us 0
console.log(value);
console.log(value2);


//Truthy and falsy values
//5 falsy values: 0,'',undefined,null,NaN
//these values will be converted into false when converted into boolean
// all other values will give true they all are truthy values
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean({})); //this will give true
console.log(Boolean(''));
console.log(Boolean('nancy')) // this will give true

const money=0; //this value is falsy it will give false therefore else part will be executed
if(money){
    console.log("Dont spend it all");
}
else{
    console.log("you should get a job");
}

//this can cause problem sometime
let height2;  //here height is not defined so it is falsy value so else part will be executed
//but if i set height1=0 this is a defined value but 0 is a falsy value so again else part will be executed therefore this causes a problem
let height3=0;
if(height2){
    console.log("Height is defined");
}
else{
    console.log("Height is undefined");
}


//Equality operators : ===(strict equality operator) , == (this will do coercion) ,!==(strict version (===)) , !=(loose version (==))
const age2=18;
if(age2 === 18){ // age2 === 18 will return true value
    console.log("You just became an adult");
}
// '18' == 18 (this will give true )
// '18' === 18 ( this will give false )

const fav=prompt("Whats's your fav number?");
console.log(fav);
console.log(typeof fav); //string

//Boolean logic
//Logical operations
//AND (&&) OR (||) NOT (!) OPERATIONS

//The switch statement
const day="monday";
switch(day) {
    case 'monday':
        console.log("Plan courses structure");
        console.log("Go to coding meetup");
        break;
    case 'tuesday':
        console.log("Prepare theory videos");
        break;
    case 'wednesday':
        console.log("prepare coding videos");
        break;
    case 'thrusday': //for both cases break day will execute
    case 'friday':
        console.log("break day");
    default:
        console.log("not a valid day");
}

//Statements and Expressions
//just an overview


//The conditional operator --> Ternary operator
const num=23;
num>=18 ? console.log("I like to drink soda") : console.log('I doont like to drink soda')
const drink= num>=20 ? "wine" : "water";
console.log(drink);

console.log(`i like to drink ${num>=18 ? "wine" : "water"}`);

"use strict";

//Constructor functions and the new operator
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never create a method inside the constructor function , it is a bad practice
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

//Only difference between the normal function and constructor function is that we call the constructor function using new operator

const nancy = new Person("Nancy", 2006);
console.log(nancy); //Person {firstName: 'Nancy', birthYear: 2006}

//1. New {} is created
//2. function is called . this={}
//3. {} linked to prototype
//4. function automatically return {}

const matilda = new Person("Matilda", 1991);
const jack = new Person("Jack", 1980);
console.log(matilda, jack);
//nancy, matilda , jack are objects here

console.log(jack instanceof Person); //true

//Prototypes
//every object that we create using the constructor function gets the access to all the methods and properties that we define on a constructor prototype property.

Person.prototype.calcAge = function () {
  console.log(2026 - this.birthYear);
};
nancy.calcAge(); //20
matilda.calcAge();
jack.calcAge();

console.log(nancy.__proto__);
console.log(nancy.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(nancy)); //true
console.log(Person.prototype.isPrototypeOf(Person)); //false
//Person is  not the prototype of itself

//properties on prototype
Person.prototype.species = "Homo Sapiens";
console.log(nancy.species); //this is but not the own property , own property are only the firstName and the birthYear

console.log(nancy.hasOwnProperty("firstName")); //true
console.log(nancy.hasOwnProperty("species")); //false

//Prototypal Inheritance on Built-In objects
//as mentioned earlier, that person is not the prototype of itself , so what is the prototype of person ? that is the object
console.log(nancy.__proto__);
console.log(nancy.__proto__.__proto__); //Object
console.log(nancy.__proto__.__proto__.__proto__); //Prototype of object : null

//Prototype of an array
const arr = [3, 6, 5, 7, 3, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__); //object

//Now all array will inherit this unique method  --> but extending the prototype of the built in objects is not preferable
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.
DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
const Car = function (speed, make) {
  this.speed = speed;
  this.make = make;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};
const bmw = new Car(120, "BMW");
const mercedes = new Car(95, "Mercedes");
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();

//ES6 Classes

//class expression
// const PersonCl = class {};

//class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //Method will be added to the .prototype property
  calcAge() {
    console.log(2026 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}
const jessica = new PersonCl("Jessica", 1995);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype); //true

//can also add the property after
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

//Setters and Getter
const account = {
  owner: "nancy",
  movements: [200, 350, 890, 234, 678],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);

//for regular method without setter
// account.latest(50);
//but now we can directly mention it as a  property
account.latest = 50;

class Intro {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  get age() {
    return 2026 - this.birthYear;
  }
  //When we try to set the property that already exists
  set fullName(name) {
    //this will check if it is a full name
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name`);
  }
  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log(`Hey There!!`);
  }
}
const tanmay = new Intro("Tanmay Paliwal", 2006);
console.log(tanmay.age);
console.log(tanmay.fullName);

//Static methods
Person.hey = function () {
  console.log(`Hey There!`);
};
Person.hey();
//nancy.hey(); //this will not work bcoz we have not created the hey function using the prototype

//if we want to write the static method inside class
Intro.hey();

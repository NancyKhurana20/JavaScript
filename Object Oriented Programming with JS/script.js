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

//Object.create
const PersonProto = {
  calcAge() {
    console.log(2026 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);

steven.name = "Steven";
steven.birthYear = 2004;
steven.calcAge();
console.log(steven.__proto__ === PersonProto); //true

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1999);
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = this.speed * 1.6;
  }
}

const ford = new Car1("Ford", 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);

//Inheritance between "classes":Constructor function
const PersonIn = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
PersonIn.prototype.calcAge = function () {
  console.log(2026 - this.birthYear);
};
const Student = function (firstName, birthYear, course) {
  //this will work but here we are repeating the same code , which we should not do
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  //Instead we can call the parent class here
  PersonIn.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(PersonIn.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.course}`);
};
const mike = new Student("Mike", 2005, "Computer Science");
mike.introduce();
mike.calcAge();

//without this the student.prototype constructor is person but it should be Student itself
Student.prototype.constructor = Student;

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
const CarIn = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
CarIn.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

CarIn.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};
const EV = function (make, speed, charge) {
  CarIn.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(CarIn.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function (speed, charge) {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`,
  );
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();

//Inheritance between classes : ES6 classes
class PersonEIN {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2026 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2026 - this.birthYear;
  }
  set fullName(name) {
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

class StudentEIN extends PersonEIN {
  constructor(fullName, birthYear, course) {
    //Always needs to happen first
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName}`);
  }
  //Overriding the method of the parent class
  calcAge() {
    console.log(
      `I m ${2026 - this.birthYear} years old but as a student i feel more like ${2026 - this.birthYear + 10}`,
    );
  }
}

const martha = new StudentEIN("Martha Jonas", 2012, "Computer Science");
martha.introduce();
martha.calcAge();

//Inheritance between classes: Object.create
const PersonObj = {
  calcAge() {
    console.log(2026 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const robin = Object.create(PersonObj);

const StudentObj = Object.create(PersonObj);

StudentObj.init = function (firstName, birthYear, course) {
  PersonObj.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentObj.introduce = function () {
  console.log(`My name is ${this.firstName}`);
};

const jay = Object.create(StudentObj);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();
jay.calcAge();

//Another class example
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    //we can also do this in our constructor
    this.movements = [];
    this.locale = navigator.language;

    console.log("Thanks for opening an account");
  }
  deposit(val) {
    this.movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }
  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved!");
    }
  }
}
const acc1 = new Account("Jonas", "EUR", 1111);

// acc1.movements.push(250);
// acc1.movements.push(-140);

//These methods are fine
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

//But we should not be allowed to acces such things like pin , and if the loan should be approved or not etc
acc1.approveLoan(1000);
console.log(acc1.pin);

console.log(acc1);

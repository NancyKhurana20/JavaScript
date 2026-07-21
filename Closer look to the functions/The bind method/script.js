const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};
const swiss = {
  airline: "Swiss Airlines",
  iataCode: "LX",
  bookings: [],
};
const book = lufthansa.book;
//Bind method-->creates or returns a new function instead of calling it
const bookEW = book.bind(eurowings);
bookEW(23, "Steven Williams");

const bookSwiss = book.bind(swiss);
bookSwiss(23, "Steven williams");

const bookLH = book.bind(lufthansa);

//if i want to keep the flightnum fixed and only change the passenger name so we can also create a function for that using bind
const bookEW23 = book.bind(eurowings, 23);
bookEW23("nancy khurana");

//With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane(); this will work properly bcoz this will point towards correct lufthansa object

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa)); //in this if we will not write the bind then the this keyword will point toward the element of html which we have selected

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//here we do not want to make the this keyword point to anything so we will write null
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

//performing the same using function callback function
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

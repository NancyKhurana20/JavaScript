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
lufthansa.book(239, "Nancy Khurana");
lufthansa.book(635, "tanmay Paliwal");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};
//if we want the same book function for this eurowings also so we will not copy paste it here again as it is bad practice instead we will keep this function in a variable book
const book = lufthansa.book;

//for calling the function , if we call the book like this it will show an error, because as it cannot access the this keyword , therefore we cannot call it like this and also by this it doesnot know whether we are calling the function for lufthansa or eurowings therefore we have other methods
//book(23, "Sarah Williams");

//Call method--> pass the object for which you want to call the function and then the parameters
book.call(eurowings, 23, "Sarah Williams");
book.call(lufthansa, 239, "Mary Cooper");
console.log(eurowings);
console.log(lufthansa);

const swiss = {
  airline: "Swiss Airlines",
  iataCode: "LX",
  bookings: [],
};
book.call(swiss, 456, "Mary Cooper");
console.log(swiss);

//Apply method-->similar to call method but instead of parameters it takes an array of the parameters
const flightdata = [236, "george cooper"];
book.apply(swiss, flightdata);
console.log(swiss);

book.call(swiss, ...flightdata); //better way than apply method

"use strict";
const rest1 = {
  name: "Capri",
  numGuests: 20,
};
const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};

//using or operator
// rest1.numGuests = rest1.numGuests || 10;
rest1.numGuests ||= 10;
// rest2.numGuests = rest2.numGuests || 10;
rest2.numGuests ||= 10;
console.log(rest1);
console.log(rest2);

//in case of zero it will not work so use nullish operator

//similarly we have logical && we can use it in same way
// rest2.owner = rest2.owner && "<ANONYMOUS>";
rest2.owner &&= "<ANONYMOUS>";

console.log(rest2);

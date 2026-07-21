/**********PART-1**********/
const airline = "TAP air Portugal";
const plane = "A320";

console.log(plane[0]);
console.log("B737"[0]);
console.log(airline.length);
console.log("B737".length);

console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("Portugal")); //we can find index of letter as well as word

console.log(airline.slice(4)); //it will extract the string from 4th index it will give the substring from 4th index so output of this is air Portugal but it doesnot change the original string

console.log(airline.slice(4, 7)); //air

console.log(airline.slice(0, airline.indexOf(" "))); //TAP
console.log(airline.slice(airline.lastIndexOf(" ") + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === "B" || s === "E") {
    console.log(`You got the middle seat`);
  } else {
    console.log("You got lucky");
  }
};
checkMiddleSeat("11B");
checkMiddleSeat("23C");

/**********PART-2**********/
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//fix capitalization in name
const passenger = "jOnAs"; //Jonas
const passengerLower = passenger.toLowerCase();
const passengercorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengercorrect);

//Comparing email
const email = "hello@jonas.io";
const loginEmail = "   Hello@Jonas.Io \n";

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); //removes unnecessary spaces and also \n it removes all
console.log(trimmedEmail);

//replacing
const priceGB = "288,97R";
const priceUS = priceGB.replace("R", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23, Boarding door 23!";
console.log(announcement.replace("door", "gate")); //only replace the first appearance of the door not the ahead one
console.log(announcement.replaceAll("door", "gate")); //this will replace all
//instead of replaceAll we can also use regex
console.log(announcement.replace(/door/g, "gate"));

//Booleans
const plane1 = "Airbus A320neo";
console.log(plane1.includes("A320"));
console.log(plane1.includes("Boeing"));
console.log(plane1.startsWith("Air"));

if (plane1.startsWith("Airbus") && plane1.endsWith("neo")) {
  console.log("Part of the new airbus");
}

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are not allowed on board");
  } else {
    console.log("You are welcome");
  }
};
checkBaggage("I have a laptop , some Food and a pocket knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

/**********PART-3**********/
console.log("a+very+nice+string".split("+")); // ['a', 'very', 'nice', 'string']
console.log("Nancy Khurana".split(" "));

const [firstName, lastName] = "Nancy Khurana".split(" ");
// console.log(firstName, lastName);

const newName = ["Miss", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);
const capitalizeName = function (name) {
  const names = name.split(" ");
  const nameUpper = [];
  for (const word of names) {
    nameUpper.push(word[0].toUpperCase() + word.slice(1));
  }
  console.log(nameUpper.join(" "));
};
capitalizeName("jessica ann smith davis");
capitalizeName("nancy khurana");

//Padding
const message = "Go to gate 23";
console.log(message.padStart(25, "+")); // ++++++++++++Go to gate 23 this will create number of + until the total length of the string becomes 25
console.log(message.padStart(25, "+").padEnd(35, "+")); //++++++++++++Go to gate 23++++++++++

const maskCreditCard = function (number) {
  const str = number + ""; //this will convert the number into string
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};
console.log(maskCreditCard(452687656148795));
console.log(maskCreditCard(16668787845454));

//Repeat
const message2 = "Bad wheather...  All departures delayed.... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🛬".repeat(n)}`);
};
planesInLine(5);

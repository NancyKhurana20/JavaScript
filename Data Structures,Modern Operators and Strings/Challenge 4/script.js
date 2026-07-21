// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
// underscore_case
//  first_name
// Some_Variable
//   calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea 😉
// HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
// HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
// HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

// Afterwards, test with your own test data!

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

document.querySelector("button").addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  const rows = text.split("\n");
  console.log(rows);
  let num = 1;
  for (const i of rows) {
    let k = i.toLowerCase().trim();
    let j = k.split("_");
    let newName = j[0] + j[1][0].toUpperCase() + j[1].slice(1);
    console.log(`${newName.padEnd(20)}${"✅".repeat(num)}`);
    num++;
  }
});

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

//Convert the following string into this
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const splitted = flights.split(";");
console.log(splitted);
const first =
  splitted[0][0].replace("_", "🔴 ") +
  splitted[0].slice(1, 8) +
  splitted[0].slice(8, 10).replace("_", " ") +
  splitted[0].slice(10).concat(" from ") +
  splitted[1].slice(0, 3).toUpperCase().concat(" to ") +
  splitted[2].slice(0, 3).toUpperCase().concat(" (") +
  splitted[3].slice(0, 5).replace(":", "h").concat(")\n");

const second =
  splitted[3].slice(7).concat(" from ") +
  splitted[4].slice(0, 3).toUpperCase().concat(" to ") +
  splitted[5].slice(0, 3).toUpperCase().concat(" (") +
  splitted[6].slice(0, 5).replace(":", "h").concat(")\n");

const third = console.log(first);
console.log(second.padStart(first.length));

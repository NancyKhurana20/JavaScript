/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//DOM elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//Creating the movements part
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//displayMovements(account1.movements);

//computing usernames --> usernames should be just the initials of each word combined in lower case

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
createUserNames(accounts);
console.log(accounts);

//calculating the total  balance of the movements using the reduce method

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelBalance.textContent = `${account.balance} EUR`;
};

//calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}💶`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}💶`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}💶`;
};
//calcDisplaySummary(account1.movements);

//Update UI function
const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);
};
//Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  //Prevent form from submitting
  e.preventDefault();

  //First we are finding the account for the particular username
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );
  //Then for this particular account we are checking the pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;

    //Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); //to loose its focus
    updateUI(currentAccount);
  }
});

//Implementing Transfers
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value,
  );

  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    //Update the user interface
    updateUI(currentAccount);
  }
});
//Requesting a loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});
//Close account --> delete the particular account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username,
    );

    console.log("Index:", index);
    console.log("Before:", accounts.length);

    accounts.splice(index, 1);

    console.log("After:", accounts.length);
    console.table(accounts);

    containerApp.style.opacity = 0;
  }

  inputClosePin.value = inputCloseUsername.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const checkDogs = function (dogsJulia, dogsKate) {
//   const copyJuliaDogs = dogsJulia.slice(1, -2);
//   const bothDogs = [...copyJuliaDogs, ...dogsKate];
//   bothDogs.forEach(function (dogs, i) {
//     if (dogs >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dogs} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy`);
//     }
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////

// MAP METHOD //
//The map() method in JavaScript is used to create a new array by transforming each element of an existing array. It does not modify the original array.

//we will take this movements array and we will convert the amount from euro to usd

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const movementsUsd = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements, movementsUsd);

//const movementsUsd = movements.map((mov) => mov * eurToUsd);

//similar to the forEach method we get the three parameters : the current element , index and the whole array
const movementDescriptions = movements.map(function (mov, i, arr) {
  //we can pass three agruments in this : first always gives the value second gives the index of the value and third gives the full array
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});
console.log(movementDescriptions);

//using map method for the bankist app

//Filter method
//The filter() method in JavaScript is used to create a new array containing only the elements that satisfy a given condition.
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);
const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

//Reduce Method
//The reduce() method is used to reduce an array to a single value.

// That single value can be:

// A sum
// A product
// An average
// The maximum or minimum value
// An object
// A string
// Or almost any accumulated result

// accumalator current value index and whole array
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(acc);
  return acc + cur;
}, 0); //0 is the initial value of the accumalator
console.log(balance);

//getting maximum value of movements array using reduce
const maxMovements = movements.reduce(function (acc, cur) {
  return cur > acc ? cur : acc;
}, movements[0]);
console.log(maxMovements);

//chaining all the methods : PIPELINE
//if you want to check the result at every step then you can also print the arr using the third parameter
// const eurToUsd = 1.1;
// const totalDepositInUsDollars = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositInUsDollars);

//Find method
//The find() method is used to find the first element in an array that satisfies a condition.

const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});
console.log(firstWithdrawal);

const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);

console.log(accounts);

///////////////////////////////////////
// The New findLast and findLastIndex Methods

console.log(movements);
const lastWithdrawal = movements.findLast((mov) => mov < 0);
console.log(lastWithdrawal);

// 'Your latest large movement was X movements ago'

const latestLargeMovementIndex = movements.findLastIndex(
  (mov) => Math.abs(mov) > 1000,
);
console.log(latestLargeMovementIndex);
console.log(
  `Your latest large movement was ${
    movements.length - latestLargeMovementIndex
  } movements ago`,
);

///////////////////////////////////////
// some and every
console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some((mov) => mov === -130));

const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

// EVERY
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

// Separate callback
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////
// flat and flatMap
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

///////////////////////////////////////
// Coding Challenge #4

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

const huskyWeight = breeds.find(
  (breed) => breed.breed === "Husky",
).averageWeight;
console.log(huskyWeight);

const dogBothActivities = breeds.find(
  (breed) =>
    breed.activities.includes("running") && breed.activities.includes("fetch"),
);
console.log(dogBothActivities);

const allActivities = breeds.flatMap((breed) => breed.activities);
console.log(allActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5.
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter((breed) => breed.activities.includes("swimming"))
      .flatMap((breed) => breed.activities)
      .filter((activity) => activity !== "swimming"),
  ),
];
console.log(swimmingAdjacent);

// 6.
console.log(breeds.every((breed) => breed.averageWeight > 10));

// 7.
console.log(breeds.some((breed) => breed.activities.length >= 3));

// BONUS
const fetchWeights = breeds
  .filter((breed) => breed.activities.includes("fetch"))
  .map((breed) => breed.averageWeight);
const heaviestFetchBreed = Math.max(...fetchWeights);

console.log(fetchWeights);
console.log(heaviestFetchBreed);

///////////////////////////////////////
// Sorting Arrays

// Strings
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1; if a is greater than a-b will be positive thats why we are returning positive number so instead we can directly return a-b
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

///////////////////////////////////////
// Array Grouping

console.log(movements);

const groupedMovements = Object.groupBy(movements, (movement) =>
  movement > 0 ? "deposits" : "withdrawals",
);
console.log(groupedMovements);

const groupedByActivity = Object.groupBy(accounts, (account) => {
  const movementCount = account.movements.length;

  if (movementCount >= 8) return "very active";
  if (movementCount >= 4) return "active";
  if (movementCount >= 1) return "moderate";
  return "inactive";
});
console.log(groupedByActivity);

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
const groupedAccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAccounts);

///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arr2 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", "")),
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll(".movements__value")];
});

///////////////////////////////////////
// Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with

console.log(movements);
const reversedMov = movements.toReversed();
console.log(reversedMov);

// toSorted (sort), toSpliced (splice)

// movements[1] = 2000;
const newMovements = movements.with(1, 2000);
console.log(newMovements);

console.log(movements);

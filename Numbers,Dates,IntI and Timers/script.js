"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

// setTimeout((elem) => {
//   console.log("timer", elem);
// }, 50000);

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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, "0");
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const year = date.getFullYear();

    const displayDate = `${day}/${month}/${year}`;
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
          i + 1
        } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = time % 60;

    //in each call , print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds,stop the timer and logout the user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }
    //decrease 1sec
    time--;
  };
  //Set time to 2 minutes
  let time = 120;

  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

//experimenting API
const date = new Date();
labelDate.textContent = new Intl.DateTimeFormat("en-US").format(date);

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current date and time
    const present = new Date();
    const day = `${present.getDate()}`.padStart(2, "0");
    const month = `${present.getMonth() + 1}`.padStart(2, "0");
    const year = present.getFullYear();
    const hour = `${present.getHours()}`.padStart(2, "0");
    const min = `${present.getMinutes()}`.padStart(2, "0");
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value,
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    //Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";

  //Reset timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username,
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

///////////////////////////////////////
// Converting and Checking Numbers
console.log(23 === 23.0);

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary base 2 - 0 1
console.log(0.1 + 0.2); //this will produce 0.300000-- and some different value
console.log(0.1 + 0.2 === 0.3); //so this will produce false

// Conversion
console.log(Number("23")); //for converting a string to a number , we can use either this method
console.log(+"23"); //or this method

// Parsing
console.log(Number.parseInt("30px", 10)); //for extracting the number from the text we can use this , but this can only work if the string is starting from a number otherwise this will not work
console.log(Number.parseInt("e23", 10)); //this will not work bcoz it is not starting from a number

console.log(Number.parseInt("  2.5rem  ")); //spaces can work , this will give us integer value that is 2
console.log(Number.parseFloat("  2.5rem  ")); //this will give us float value that is 2.5

// console.log(parseFloat('  2.5rem  '));

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(23 / 0));

// Checking if value is number
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20X"));
console.log(Number.isFinite(23 / 0));

//Checking if the value is a integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

///////////////////////////////////////
// Math and Rounding

//To take the square root of a number
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3)); //cuberoot

console.log(Math.max(5, 18, 23, 11, 2)); //gives the maximum
console.log(Math.max(5, 18, "23", 11, 2));
console.log(Math.max(5, 18, "23px", 11, 2)); //this will not work

console.log(Math.min(5, 18, 23, 11, 2)); //gives the minimum

console.log(Math.PI * Number.parseFloat("10px") ** 2); //to calculate the area of a circle of 10pixels radius

console.log(Math.trunc(Math.random() * 6) + 1); //this generates a random number between 1-6

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min; //this function will help to create a random number betweeen min and max

console.log(randomInt(10, 20));
console.log(randomInt(0, 3));

// Rounding integers
console.log(Math.round(23.3)); //this will result in 23
console.log(Math.round(23.9)); //this will result in 24

console.log(Math.ceil(23.3)); //this will always give the higher value 24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //this will always give the lower value 23
console.log(Math.floor("23.9")); //23

console.log(Math.trunc(23.3));

//difference between trunc and floor , comes when there is a negative number
console.log(Math.trunc(-23.3)); //23
console.log(Math.floor(-23.3)); //24

// Rounding decimals
console.log((2.7).toFixed(0)); //round of the decimal upto 0 digit 2
console.log((2.7).toFixed(3)); //round of the decimal upto 3 digit 2.700
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

///////////////////////////////////////
// The Remainder Operator
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(6 % 2);
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     // 0, 2, 4, 6
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     // 0, 3, 6, 9
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

///////////////////////////////////////
// Numeric Separators

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number("230_000"));
console.log(parseInt("230_000"));

///////////////////////////////////////
// Working with BigInt
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n);
console.log(36286372637263726376237263726372632n * 10000000n);
// console.log(Math.sqrt(16n));

const huge = 20289830237283728378237n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == "20");

console.log(huge + " is REALLY big!!!");

// Divisions
console.log(11n / 3n);
console.log(10 / 3);

///////////////////////////////////////
// Creating Dates

// Create a date

const now = new Date(); //Creates a Date object with the current date and time.
//example output
console.log(now); //2026-07-13T13:45:20.123Z

//Creates a date from a date string.
console.log(new Date("Aug 02 2020 18:05:41")); //Sun Aug 02 2020 18:05:41 GMT+0530 (India Standard Time)

console.log(new Date("December 24, 2015")); //Another way to create a date from a readable string

console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
//2037 → year
// 10 → November (months are 0-indexed)
// 19 → day
// 15 → 3 PM
// 23 → minutes
// 5 → seconds
//Thu Nov 19 2037 15:23:05 GMT+0530

console.log(new Date(2037, 10, 31)); //There is no November 31st.JavaScript automatically adjusts invalid dates.

console.log(new Date(0)); //The number passed is interpreted as milliseconds since the Unix Epoch. he Unix Epoch is: January 1, 1970 00:00:00 UTC , so the output approximately is : Thu Jan 01 1970 05:30:00 GMT+0530

console.log(new Date(3 * 24 * 60 * 60 * 1000)); //3 days
// = 3 × 24 × 60 × 60 × 1000
// = 259200000 milliseconds
// So this creates a date 3 days after January 1, 1970.

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); //return the year 2037
console.log(future.getMonth()); //return the month 10
console.log(future.getDate()); //return the date 19
console.log(future.getDay()); //return the day 4 (0-sunday , 1-monday and so on )
console.log(future.getHours()); //returns the hours 15
console.log(future.getMinutes()); //returns the minutes 23
console.log(future.getSeconds()); //returns the seconds 0
console.log(future.toISOString()); //Converts the date into the standard ISO format (UTC).
console.log(future.getTime()); //Returns the number of milliseconds since January 1, 1970 (Unix Epoch).

console.log(new Date(2142256980000));

console.log(Date.now()); //returns the current timestamp in milliseconds since the Unix Epoch

future.setFullYear(2040); //Changes only the year.
console.log(future);

//internationalizing dates
//Instead of writing all this:
// const present = new Date();
// const day = `${present.getDate()}`.padStart(2, "0");
// const month = `${present.getMonth() + 1}`.padStart(2, "0");
// const year = present.getFullYear();
// const hour = `${present.getHours()}`.padStart(2, "0");
// const min = `${present.getMinutes()}`.padStart(2, "0");
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

//we can simply use the internationalization and then use this format according to our country
const date1 = new Date();
labelDate.textContent = new Intl.DateTimeFormat("en-US").format(date1);

//more experiments we can do here
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric", //for month we can also write 'long' , so it will give written in words like march etc...
  year: "numeric", //if we want only the year like 26 then we can write '2-digit'
};
labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(date1); //here we will get the date according to the options object

const locale = navigator.language;
console.log(locale);
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(date1);

//internationalizing numbers

const num1 = 3728732.23;
console.log(new Intl.NumberFormat("en-IN").format(num1)); //37,28,732.23
//we can use this for different countries
//we can also use navigator.language

//if the number has a unit , we can set using this
const options1 = {
  style: "unit",
  unit: "mile-per-hour",
};
console.log(new Intl.NumberFormat("en-IN", options1).format(num1)); //37,28,732.23 mph

const options2 = {
  style: "currency",
  unit: "celsius",
  currency: "EUR",
};
console.log(new Intl.NumberFormat("en-IN", options2).format(num1)); //€37,28,732.23

//timers : setTimeout and setInterval

//setTimeout
setTimeout(() => console.log("here is your pizza"), 5000);

setTimeout(
  (ing1, ing2) =>
    console.log(`here is your pizza with ingredients ${ing1},${ing2}`),
  5000,
  "olives",
  "spinach",
);

const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(
      `here is your pizza with following ingredients ${ing1},${ing2}`,
    ),
  3000,
  ...ingredients,
);
//if we want to cancel particular timer
if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

//setInterval -->
//if we want to execute a function in every 1 sec then we use setInterval --> time can differ

// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);

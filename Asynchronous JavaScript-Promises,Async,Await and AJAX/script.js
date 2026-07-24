"use strict";

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
//Theoritical Info about the terms

//Synchronous Code
// Synchronous means one line executes after another.The next line must wait until the previous line finishes.
//Problem with synchronous code -> if a process is taking long time to run , then we need to wait for it to complete and then only next line executes for example in case of the alert window , it blocks the whole code until user presses the ok button

//Asynchronous Code
// Instead of waiting JavaScript says "I'll start this task and continue doing other work." When the task finishes, JavaScript comes back to it.
// Example

// console.log("Start");

// setTimeout(function () {
//   console.log("Hello");
// }, 3000);
// console.log("End");
//timer of 3 seconds will run in the bg ,and until then the other code will execute , it will not wait to run the other lines of the code

//AJAX
// IT allows JavaScript to communicate with a server in the background without reloading the page.
// Browser

// ↓

// Send request

// ↓

// Server

// ↓

// Send data back

// ↓

// Update page

// (No Reload)

//API
// An interface that allows one application to communicate with another.

//OUR FIRST API CALL

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet("Hey"); //this greeterHey becomes the function which is inside the greet function
greeterHey("Nancy");
greeterHey("Tanmay");

greet("Hello")("Nancy");

//Same function using arrow function
// const greet = (greeting) => {
//   return (name) => {
//     console.log(`${greeting} ${name}`);
//   };
// };
// greet("Hello")("Nancy");

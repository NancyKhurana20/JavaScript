const flight = "LH234";
const nancy = {
  name: "nancy khurana",
  passport: 234568765,
};
const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Miss " + passenger.name;
  if (passenger.passport === 234568765) {
    alert("checked in");
  } else {
    alert("wrong passport");
  }
};
checkIn(flight, nancy);
console.log(flight);
console.log(nancy);
//in this we passed the flight value as the flightNum so if we change the flightNum so only flightNum will be changed not the original value Primitive data types remains same
//but in case of object if i change the value of passenger.name so if i print the nancy.name it will also be changed , all different name of the objects points to one single object in the memory
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random()) * 1000000;
};
newPassport(nancy);
checkIn(flight, nancy);

//javascript doesnot have pass by reference it only allows pass by value

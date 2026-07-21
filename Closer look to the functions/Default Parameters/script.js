"use strict";
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 4, 1000);
createBooking("LH123", 2);
createBooking("LH123", 5);

//createBooking("LH123",1000); //skipping the middle parameter is not possible
createBooking("LH123", undefined, 1000); //instead make it undefined

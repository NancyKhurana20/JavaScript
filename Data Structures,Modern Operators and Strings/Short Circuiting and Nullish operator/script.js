"use strict";
// && || they can use any data type , return any data type
console.log("Nancy" || 3); // if first value is truthy value it will return the first value therefore this will return or print nancy

console.log("" || "nancy"); // nancy
console.log(true || "nancy"); //true
console.log(undefined || null); //null

console.log(undefined || 0 || "" || "Hello" || 23 || null); //Hello

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function (obj) {
    console.log(obj);
  },
  orderdelivery: function ({ time = "00:00", place, amount }) {
    console.log(time, place, amount);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); //10 because restaurant.numGuests doesnot exists
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log(0 && "nancy"); //if first value is falsy it simply returns the first value and doesnot go behind
console.log(7 && "nancy"); //if all values are truthy then it will go till the end and then print the last value

if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

//with using && opeator
restaurant.orderPizza && restaurant.orderPizza("mushroom", "spinach");

//Nullish Coalescing operator
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests ?? 10;
console.log(guests3);
//0 is the falsy value so 10 will be printed but if we want 0 to be printed then we use nullish opertor it works same as the or operator
//but  it only includes null and undefined not the 0 and ''

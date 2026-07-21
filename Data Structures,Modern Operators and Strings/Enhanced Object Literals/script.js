const weekdays = ["mon", "tues", "wed", "thrus", "fri", "sat", "sun"];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`day-${2 + 4}`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  //Normally
  //   openingHours: openingHours,
  //Enhanced ES6 object literals
  openingHours,
  //   openingHours: {
  //     thu: {
  //       open: 12,
  //       close: 22,
  //     },
  //     fri: {
  //       open: 11,
  //       close: 23,
  //     },
  //     sat: {
  //       open: 0, // Open 24 hours
  //       close: 24,
  //     },
  //   },
  //Normally
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //ES6 enhanced version
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function (obj) {
    console.log(obj);
  },
  orderdelivery: function ({ time = "00:00", place, amount }) {
    console.log(time, place, amount);
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1} ${ing2} ${ing3}`);
  },
};

console.log(restaurant);

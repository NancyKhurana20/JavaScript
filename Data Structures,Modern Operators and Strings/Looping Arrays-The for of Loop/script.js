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
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1} ${ing2} ${ing3}`);
  },
};

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) {
  console.log(item);
}
//getting index
for (const item of menu.entries()) {
  console.log(item);
  //(2) [0, 'Focaccia']
  // script.js:43 (2) [1, 'Bruschetta']
  // script.js:43 (2) [2, 'Garlic Bread']
  // script.js:43 (2) [3, 'Caprese Salad']
  // script.js:43 (2) [4, 'Pizza']
  // script.js:43 (2) [5, 'Pasta']
  // script.js:43 (2) [6, 'Risotto']
}

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1} : ${el}`);
}

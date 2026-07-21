const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

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

const openingHours = {
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
};

//Property names
const properties = Object.keys(openingHours);
console.log(properties); //gives array
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

//Property values
const values = Object.values(openingHours);
console.log(values);

//Entire Object
const entries = Object.entries(openingHours);
console.log(entries);

for (const x of entries) {
  console.log(x);
}

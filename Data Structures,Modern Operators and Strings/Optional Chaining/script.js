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

console.log(restaurant.openingHours.mon); //this property doesnot exixts so it will show undefined but if we dont know if it opens on this day or not
//console.log(restaurant.openingHours.mon.open); //this will show an error , bcoz undefined.something will show error
//we can use if else in this case

//using optional chaining
console.log(restaurant.openingHours.mon?.open); //this will not show any error simply it will show the indefined , anything before ? will be checked first that if it exists or not , if exists .open wil be executed otherwise undefined

console.log(restaurant.openingHours?.mon?.open); //this will first check if restaurant.openingHours exixts then it will check for next

const weekdays = ["mon", "tues", "wed", "thu", "fri", "sat", "sun"];
for (const day of weekdays) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);
}

//Methods
console.log(restaurant.order?.(0, 1) ?? "Method doesnot exists");

console.log(restaurant.orderChai?.(0, 1) ?? "Method doesnot exists");

//Arrays
const users = [{ name: "Jonas", email: "Hello@jonas.io" }];
console.log(users[0]?.name ?? "User Array Empty");

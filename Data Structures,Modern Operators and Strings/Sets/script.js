"use strict";
//set is a collection of all unique values no duplicates
const orderSet = new Set(["pasta", "pizza", "pizza", "pasta", "risotto"]);
console.log(orderSet);

console.log(new Set("Nancy"));

console.log(orderSet.size);

console.log(orderSet.has("pizza"));
console.log(orderSet.has("sandwich"));

orderSet.add("Garlic bread");
console.log(orderSet);

orderSet.delete("pizza");
console.log(orderSet);

//orderSet.clear() //delete full set

for (const order of orderSet) {
  console.log(order);
}

//Example
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const setStaff = new Set(staff);
console.log(setStaff);

//if we want an array of this unique elements
const uniqueArr = [...new Set(staff)];
console.log(uniqueArr);

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);

//Intersection of two sets
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log(commonFoods);
console.log([...commonFoods]); //for array

//Union of two sets
const unionFoods = italianFoods.union(mexicanFoods);
console.log(unionFoods);
console.log([...unionFoods]);

//Difference of two sets
const differenceFoods = italianFoods.difference(mexicanFoods);
console.log(differenceFoods); //it will remove the common elements from the italianFoods

//Symmetric difference of two sets : it will give elements of both sets except the common elements
const symmetricFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log(symmetricFoods);

// is disjoint from
console.log(italianFoods.isDisjointFrom(mexicanFoods)); //false
//similarly we have is subset of or is super set of

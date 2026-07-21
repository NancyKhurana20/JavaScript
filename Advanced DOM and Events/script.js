"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Selecting creating and deleting elements

console.log(document.documentElement); //selecting the entire document , full html
console.log(document.head); //selecting only the head
console.log(document.body); //selecting  only the body

const header = document.querySelector(".header"); //selects the first thing with this class
const allSections = document.querySelectorAll(".section"); //give a node list of all which contains section as there class
document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons); //return whole html collections not an node list , gives all the buttons tag elements , updates automatically when you delete something , but node list cannot do that

document.getElementsByClassName("btn"); //this one also gives the live html collections

//Creating and inserting elements

// .insertAdjacentHTML --> inserting the whole html part
//Example from bankist application
// const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${
//           i + 1
//         } ${type}</div>
//         <div class="movements__date">${displayDate}</div>
//         <div class="movements__value">${mov.toFixed(2)}€</div>
//       </div>
//     `;

//     containerMovements.insertAdjacentHTML("afterbegin", html);

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent='We use cookied for improved functionality and analytics';
message.innerHTML =
  'We use cookied for improved functionality and analytics , <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message); //adds the elements to the first one among all the elements which containes the this class
header.append(message); //adds to the last amongst all
//if we keep the both , it will be kept only at one place , first at start then we changed it to the end , means we can also use these to move the element

//but if we want it multiple times
//header.append(message.cloneNode(true)); //now through this it will be at both prepend and append

//header.before(message); //this will be created before the header class
//header.after(message); //after the header

//Delete element
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

//Styles , attributes and classes

//Styles
message.style.backgroundColor = "#37383d"; //setting the color of the element
message.style.width = "120%";

console.log(message.style.height); //we will get nothing with this , this will work for which we set manually here
console.log(message.style.backgroundColor); //this will work
//but if we want still want that
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

//changing our custom properties -->we can use this same for all the properties
// document.documentElement.style.setProperty("--color-primary", "orangered");

//Attributes
//Accessing the attributes of a particular class
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
//the one attribute which do not exists means which is not standard property  and we still try to print that , it will just show undefined

//another way
console.log(logo.getAttribute("designer")); //through this we can get the another properties also which are not standard
logo.setAttribute("company", "Bankist"); //setting new attribute

logo.getAttribute("src"); //absolute version , real url
console.log(logo.src); //url wrt to only the html file

const link = document.querySelector(".twitter-link");
console.log(link.href);
console.log(link.getAttribute("href"));

//Data attributes -->attributes which start with 'data'
console.log(logo.dataset.versionNumber); //only access this using dataset

//Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

//Dont use this thing but just for knowledge this method exists
// logo.className='Nancy';

//Implementing smooth scrolling

//by clicking on the learn more button , it should smoothly slide down to the next slide
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function (e) {
  //first we will get the coordinates of the section we want to scroll down to
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); //this will give the coordinates of the button

  console.log("Current Scroll (X/Y", window.pageXOffset, window.pageYOffset);

  console.log(
    "height and width of the viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,
  );

  //Scrolling
  //Method 1
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset,
  // );

  //Method 2
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  //Method 3 -->easy one
  section1.scrollIntoView({ behavior: "smooth" });
});

//Types of events and event handler

const h2 = document.querySelector("h1");
const alertH1 = function (e) {
  //works similar to the hover option in CSS
  alert("addEventListener : Great! You r reading the heading");
};
h2.addEventListener("mouseenter", alertH1);

setTimeout(() => h2.removeEventListener("mouseenter", alertH1), 3000); //if we want to remove the listnere then we can use this , so after this even if we hover the alert message will not come

//Direct using the property -->but it is more appropriate to use addEventListener
// h1.onmouseenter = function (e) {
//   //works similar to the hover option in CSS
//   alert("addEventListener : Great! You r reading the heading");
// };

//Event Propagation : Bubbling and capturing

//Generating random color
//first writing the function for generating a random number
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("CONTAINER", e.target, e.currentTarget);
// });
// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// });

//This is exactly what event bubbling means: the event starts at the element that was clicked (e.target) and then propagates upward through its ancestor elements, triggering their event listeners unless propagation is stopped.

//Event delegation :implementating page navigation

//Page navigation without event delegation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   console.log(el);
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href"); //#section--1,2 and so on
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });
//problem with this method is that we are executing the same function for all the links again and again , instead we can just apply this to the entire container , using bubbling method , that we can do using the event delegation

//Page navigation using event delegation
//first we will add the event listener to the common parent element
//then we will determine element originated the event--> that we can get through the e.target
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href"); //#section--1,2 and so on
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//DOM traversing

const h1 = document.querySelector("h1");

//Going downwards:child
console.log(h1.querySelectorAll(".highlight")); //Searches inside the <h1> only for all elements that have the class .highlight.return a nodelist
console.log(h1.childNodes); //Returns all child nodes of the <h1>.return a nodelist
console.log(h1.children); //Returns only the HTML element children.returns the html collections not the node list , so it remains updated

h1.firstElementChild.style.color = "white";

//Going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary)";

//Going sideways : siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

//Building a tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// tabs.forEach((t) =>
//   t.addEventListener("click", () => {
//     console.log("TAB");
//   }),
// );
//we will use event delegation
tabsContainer.addEventListener("click", function (e) {
  // if we only write the e.target then if we click on the button it will work properly but on the button if we click on the number it will give span instead of whole button and if we write .parentElement then the clicking on number will give the correct thing but clicking on rest of the button will give its parent element
  //so we write the closest one , so for span also the closest parent element containing the operations__tab is button element and for the button element also the parent with particular class is the button itself
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //Guard clause
  //if we click anywhere else not on the button then the value of clicked will be null , so it should return then
  if (!clicked) return;

  //when we click on the button it should move up and then down
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  clicked.classList.add("operations__tab--active");

  //activating the content area
  //first remove the active part
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Passing arguments to event handlers

//whenever we hover on any of the links in the nav bar , then the other links should be fade out , become lighter
//mousenter doesnot bubble
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link1 = e.target;
    const siblingss = link1.closest(".nav").querySelectorAll(".nav__link");
    const logo1 = link1.closest(".nav").querySelector(".img");

    siblingss.forEach((el) => {
      if (el !== link1) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};
const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
});

//Implementing a sticky navigation: the scroll event
//this technique should not be used as in this one every time you scroll even though a little this works , which is not appropriate
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//Better way

//the intersection observer:API
//Intersection Observer --> Think of it like this: "Hey browser, keep an eye on this element and tell me whenever it comes into or goes out of the visible part of the screen."

// This is the callback function.
// Imagine you're hiring a security guard.
// You tell him:
// "Whenever something happens to Section 1, call me."
// The callback is that phone call.
// Whenever section1 enters or leaves the screen, this function runs.
// const obsCallBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// //These are the observer settings.
// const obsOptions = {
//   root: null, //"Use the browser window (viewport) as the area to watch."
//   threshold: 0.1, //Trigger when 10% of the element becomes visible.
//   //If you used threshold: 0 The callback runs the instant even one pixel appears.
// };
// const observer = new IntersectionObserver(obsCallBack, obsOptions); //This creates the observer.
// observer.observe(section1); //Now you're telling the observer: "Watch this element."

// getBoundingClientRect() --> position and size of an element relative to the browser's viewport

//now using this to implement sticky navigation
const header1 = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, //Trigger as soon as the header starts entering or completely leaves the viewport.
  rootMargin: `${navHeight}px`,
  //With a negative rootMargin equal to the nav's height, the observer acts as if the viewport ends a little earlier, so the nav becomes sticky just before it would overlap the top of the page
});
headerObserver.observe(header1);

//Revealing elements on scroll
const allsections = document.querySelectorAll("section");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allsections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Loading images --> in the img tag we have two properties defined one is the src which already comes with img tag and another is the data-src , so we kept the low quality img in the src , and the image with high resolution in the data-src , so when the page loads and we go to that particular image then it is converted from src to data-src , also we have a class lazy--img in which we create the blur effect

const imgTargets = document.querySelectorAll("img[data-src]"); //this will only select the particular img tag which contains the property data-src
const loadingImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //replace the src with the data-src
  entry.target.src = entry.target.dataset.src;
  //removing the blur effect from the image
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observe.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

//Building a slider component --> Part 1

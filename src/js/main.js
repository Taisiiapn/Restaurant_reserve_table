// let images = document.querySelectorAll('.header__slider-container img');
// let current = 0;

// function slider() {
//   for (let i = 0; i < images.length; i++) {
//     images[i].classList.add('header__opacity0');
//   }
//   images[current].classList.remove('header__opacity0');
// }

// document.querySelector('.header__slider-btn--left').onclick = function() {
//   if (current - 1 == -1) {
//     current = images.length - 1;
//   } else {
//     current--;
//   }
//   slider();
// };
  
// document.querySelector('.header__slider-btn--right').onclick = function() {
//   if (current + 1 == images.length) {
//     current = 0;
//   } else {
//     current++;
//   }
//   slider();
// };





// --------------------------sliders

let images = document.querySelectorAll('.header__slider-container img');
let current = 0;
let btnLeft = document.querySelector('.header__slider-btn--left');
let btnRight = document.querySelector('.header__slider-btn--right');

function slider() {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.add('header__opacity0');
  }
  images[current].classList.remove('header__opacity0');
}

btnLeft.onclick = function() {
  if (current - 1 == -1) {
    current = images.length - 1;
  } else {
    current--;
  }
  slider();
};
  
btnRight.onclick = function() {
  if (current + 1 == images.length) {
    current = 0;
  } else {
    current++;
  }
  slider();
};
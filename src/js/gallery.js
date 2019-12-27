let photos = document.querySelectorAll('.main__slider-container img');
let counter = 0;
let mainBtnLeft = document.querySelector('.main__slider-btn--left');
let mainBtnRight = document.querySelector('.main__slider-btn--right');

function gallerySlider() {
  for (let i = 0; i < photos.length; i++) {
    photos[i].classList.add('main__opacity0');
  }
  photos[counter].classList.remove('main__opacity0');
}

mainBtnLeft.onclick = function() {
  if (counter - 1 == -1) {
    counter = photos.length - 1;
  } else {
    counter--;
  }
  gallerySlider();
};
  
mainBtnRight.onclick = function() {
  if (counter + 1 == photos.length) {
    counter = 0;
  } else {
    counter++;
  }
  gallerySlider();
};
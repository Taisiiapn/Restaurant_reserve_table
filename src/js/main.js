//--------------------------loaded

function showContent(link, scriptLink) {

  let cont = document.getElementById('contentBody');
  let http = createRequestObject();
  if (http) {
    http.open('get', link);
    http.onreadystatechange = function () {
      if(http.readyState === 4) {
        cont.innerHTML = http.responseText;
        window.scrollTo(0,0);
        if (scriptLink) {
          let newScript = document.createElement("script");
          newScript.src = scriptLink;
          document.querySelector('body').appendChild(newScript);
        }
      }
    }
    http.send(null);
  } else {
    document.location = link;
  }
}

// создание ajax объекта
function createRequestObject() {
  try { return new XMLHttpRequest() }
  catch(e) {
    try { return new ActiveXObject('Msxml2.XMLHTTP') }
    catch(e) {
      try { return new ActiveXObject('Microsoft.XMLHTTP') }
      catch(e) { return null; }
    }
  }
}

//--------------------------sliders

let images = document.querySelectorAll('.main__slider-container img');
let current = 0;
let btnLeft = document.querySelector('.main__slider-btn--left');
let btnRight = document.querySelector('.main__slider-btn--right');

function slider() {
  for (let i = 0; i < images.length; i++) {
    images[i].classList.add('main__opacity0');
  }
  images[current].classList.remove('main__opacity0');
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
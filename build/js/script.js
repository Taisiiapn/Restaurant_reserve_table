
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
function search() {
  let input = document.querySelector('.menu-main__search-form');
  let filterValue = input.value.toUpperCase();
  let itemCards = document.querySelector('.menu-main__restaurant');
  let card = itemCards.querySelectorAll('.menu-main__item');

  for (let i = 0; i < card.length; i++) {
    let cardTitle = card[i].querySelectorAll('.menu-main__title')[0];
    if (cardTitle.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      card[i].style.display = "";
    } else {
      card[i].style.display = "none";
    }
  }
}

function reternItems() {
  let card = document.querySelectorAll('.menu-main__item');
  for (let i = 0; i < card.length; i++) {
    card[i].style.display = "block";
  }
}

function sortByWeight() {
  let items = document.querySelectorAll('.menu-main__item');
  items = [].slice.call(items, 0);
  let parent = items.map(el => {
    return el.parentNode;
  })
  items.sort((a, b) => {
    return a.getAttribute('data-sortByWeight') - b.getAttribute('data-sortByWeight');
  }).forEach((el, i) => {
    parent[i].appendChild(el);
  })
}

function sortByAlphabet() {
  let list = document.querySelector('.menu-main__restaurant');
  let nodesToSort = list.querySelectorAll('.menu-main__item');
  Array.prototype.map.call(nodesToSort, function(node) {
    return {
      node: node,
      relevantText: node.querySelector('.menu-main__title').textContent
    };
  }).sort(function(a, b) {
    return a.relevantText.localeCompare(b.relevantText);
  }).forEach(function(item) {
    list.appendChild(item.node);
  })
}
//--------------------------booking button
let inputsObj;

function book() {
  let inputName = document.querySelector('#name');
  let inputPhone = document.querySelector('#phone');
  let inputDate = document.querySelector('#date');
  let inputTimeStart = document.querySelector('#time-start');
  let inputTimeEnd = document.querySelector('#time-end');

  inputsObj = {
    id: '',
    name: inputName.value,
    phone: inputPhone.value,
    date: inputDate.value,
    timeStart: inputTimeStart.value,
    timeEnd: inputTimeEnd.value
  };

  let localStorageObj = [];
  for (let i = 0; i < localStorage.length; ++i) {
    localStorageObj.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  for (let k = 0; k < localStorageObj.length; k++) {
    if (inputsObj.date == localStorageObj[k].date) {
      if (inputsObj.timeStart <= localStorageObj[k].timeStart &&
          localStorageObj[k].timeEnd <= inputsObj.timeEnd ||
          localStorageObj[k].timeStart <= inputsObj.timeStart &&
          inputsObj.timeEnd <= localStorageObj[k].timeEnd ||
          localStorageObj[k].timeStart <= inputsObj.timeStart &&
          localStorageObj[k].timeEnd <= inputsObj.timeEnd &&
          localStorageObj[k].timeEnd >= inputsObj.timeStart ||
          inputsObj.timeStart <= localStorageObj[k].timeStart &&
          localStorageObj[k].timeStart <= inputsObj.timeEnd &&
          localStorageObj[k].timeEnd >= inputsObj.timeEnd) {
          
        document.getElementById(localStorageObj[k].id).style.display = "none";
        document.getElementById(localStorageObj[k].id + +10).style.display = "block";
      }
    }
  }

  if (inputName.value && inputPhone && inputDate.value && inputTimeStart && inputTimeEnd) {
    document.querySelector('.booking-main__background').style.display = 'none';
    document.querySelector('.booking-main__form').style.display = 'none';
  } else {
    alert('Вы не заполнили все поля');
  }
}

function clickTable(tableNum) {
  clickTable = function() {};
  inputsObj["id"] = tableNum;
  localStorage.setItem(inputsObj.phone, JSON.stringify(inputsObj));
  document.getElementById(tableNum).style.display = "none";
  document.getElementById(tableNum + +10).style.display = "block";
  document.querySelector('.booking-main__wrapper').style.visibility = "hidden";
  document.querySelector('.booking-main__wrapper').style.height = "500px";
  document.querySelector('.booking-main__modal').style.display = "block";
  document.querySelector('.booking-main__table-free').style.display = "none";
  document.querySelector('.booking-main__table-reserved').style.display = "block";
}

function modalClose() {
  document.querySelector('.booking-main__modal').style.display = "none";
  document.querySelector('.booking-main__wrapper').style.height = "auto";
  document.querySelector('.booking-main__wrapper').style.visibility = "visible";
}
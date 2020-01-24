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

//--------------------------pagination

const itemsArr = [...document.querySelectorAll('menu-main__item')];
const parent = document.querySelector('.menu-main__restaurant');
const paginationElem = document.querySelector('#pagination').textContent;
console.log(paginationElem);

let current_page = 1;
let columns = 3;

function DisplayList (items, columns_per_page, page) {
	// wrapper.innerHTML = "";
	page--;

	let start = columns_per_page * page;
	let end = start + columns_per_page;
	let paginatedItems = items.slice(start, end);

	// for (let i = 0; i < paginatedItems.length; i++) {
	// 	let item = paginatedItems[i];
		// let item_element = document.createElement('div');
		// item_element.classList.add('item');
		// item_element.innerText = item;
		// wrapper.appendChild(item_element);
	// }
}

function SetupPagination (items, wrapper, columns_per_page) {
	wrapper.innerHTML = "";

	let page_count = Math.ceil(items.length / columns_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, items);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, items) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(items, parent, columns, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

DisplayList(itemsArr, columns, current_page);
SetupPagination(itemsArr, paginationElem, columns);
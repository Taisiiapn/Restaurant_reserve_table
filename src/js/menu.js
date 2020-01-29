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
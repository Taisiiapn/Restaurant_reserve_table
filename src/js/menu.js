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
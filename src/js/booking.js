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
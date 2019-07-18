/* eslint-disable no-console */
'use strict';

function getDogImage(num) {
  const url = 'https://dog.ceo/api/breeds/image/random/';
  fetch(url + num)
    .then(response => response.json())
    .then(jsonData => extractData(jsonData))
    .then(data => renderImages(data))
    .catch(error => console.log(error));
}

function getBreedImage(breed) {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  fetch(url)
    .then(response => response.json())
    .then(jsonData => extractData(jsonData))
    .then(messages => renderImages(messages));
}

function handleUserSubmit() {
  $('.rando-dog').submit(event => {
    event.preventDefault();
    const num = $(event.currentTarget)
      .find('input[id="number"]')
      .val();
    getDogImage(num);
  });
}

function renderImages(dataArr) {
  if (dataArr[1] === 'error') {
    $('.dog-imgs').html(`
    <h2>Error!</h2>
    <p>${dataArr[0]}</p>
    <img src='https://www.petsuppliesplus.com/-/media/Images/PSP/Product%20Images/2017/03/29/20/59/750683200043_4.ashx?h=590?h=453' alt="empty dog cage">
  `);
  } else if (typeof dataArr[0] === 'object') {
    console.log(dataArr[0]);
    $('.dog-imgs').html('<h2>Dog Pics</h2>');
    dataArr[0].forEach(imgUrl => {
      $('.dog-imgs').append(`<img src="${imgUrl}" alt="dog image">`);
    });
  } else {
    console.log(dataArr[0]);
    $('.dog-imgs').append(`<img src="${dataArr[0]}" alt="dog image">`);
  }
}

function extractData(data) {
  const { message, status } = data;
  return [message, status];
}

function handleBreedSubmit() {
  $('.select-breed').submit(event => {
    event.preventDefault();
    const breed = $(event.currentTarget)
      .find('input[id="breed"]')
      .val();
    getBreedImage(breed);
  });
}

function binder() {
  handleUserSubmit();
  handleBreedSubmit();
}

$(binder());

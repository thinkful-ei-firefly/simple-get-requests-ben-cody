/* eslint-disable no-console */
'use strict';

function getDogImage(num) {
  const url = 'https://dog.ceo/api/breeds/image/random/';
  fetch(url + num)
    .then(response => response.json())
    .then(data => renderImages(data))
    .catch(error => console.log(error));
}

function getBreedImage(breed) {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  fetch(url)
    .then(response => response.json())
    .then(messages => renderImages(messages))
    .catch(error => console.log(error));
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

function renderImages(data) {
  $('.dog-imgs').html('<h2>Dog Pics</h2>');
  if (data.status === 'error') {
    $('.dog-imgs').html(`
    <h2>Error!</h2>
    <p>${data.message}</p>
    <img src='https://www.petsuppliesplus.com/-/media/Images/PSP/Product%20Images/2017/03/29/20/59/750683200043_4.ashx?h=590?h=453' alt="empty dog cage">
  `);
  } else if (typeof data.message === 'object') {
    console.log(data.message);
    data.message.forEach(imgUrl => {
      $('.dog-imgs').append(`<img src="${imgUrl}" alt="dog image">`);
    });
  } else {
    console.log(data.message);

    $('.dog-imgs').append(`<img src="${data.message}" alt="dog image">`);
  }
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

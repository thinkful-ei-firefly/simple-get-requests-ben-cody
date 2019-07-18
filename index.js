/* eslint-disable no-console */
'use strict';

function getDogImage(num) {
  const url = 'https://dog.ceo/api/breeds/image/random/';
  console.log(url + num);
  fetch(url + num)
    .then(response => response.json())
    .then(jsonData => extractData(jsonData))
    .then(messages => renderImages(messages))
    .catch(error => console.log(error));
}

function getBreedImage(breed) {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(jsonData => extractData(jsonData))
    .then(messages => renderImages(messages));
}

function handleUserSubmit() {
  $('.rando-dog').submit(event => {
    console.log(event.currentTarget);
    event.preventDefault();
    const num = $(event.currentTarget)
      .find('input[id="number"]')
      .val();
    getDogImage(num);
  });
}

function renderImages(message) {
  $('.dog-imgs').html('<h2>Dog Pics</h2>');
  if (typeof message === 'object') {
    message.forEach(imgUrl => {
      $('.dog-imgs').append(`<img src="${imgUrl}" alt="dog image">`);
    });
  } else {
    $('.dog-imgs').append(`<img src="${message}" alt="dog image">`);
  }
}

function extractData(data) {
  let { message } = data;
  console.log(message);
  return message;
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

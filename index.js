/* eslint-disable no-console */
'use strict';
/* global $ */

function getDogImage(num) {
  const url = 'https://dog.ceo/api/breeds/image/random/';
  console.log(url + num);
  fetch(url + num)
    .then(response => response.json())
    .then(jsonData => extractData(jsonData))
    .then(messages => renderImages(messages));
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
  $('.rando-breed').submit(event => {
    event.preventDefault();
    const num = $(event.currentTarget)
      .find('input[id="number"]')
      .val();
    getDogImage(num);
  });
}


// add if else for case of single image
function renderImages(messages) {
  $('.dog-imgs').html('<h2>Dog Pics</h2>');
  messages.forEach(imgUrl => {
    $('.dog-imgs').append(`<img src="${imgUrl}" alt="dog image">`);
  });
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

/* eslint-disable no-console */
'use strict';
/* global $ */

function getDogImage(num) {
  fetch('https://dog.ceo/api/breeds/image/random/' + num)
    .then(response => response.json())
    .then(jsonData => extractData(jsonData))
    .then(messages => renderImages(messages));
}

function handleUserSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    const num = $(event.currentTarget)
      .find('input[id="number"]')
      .val();
    getDogImage(num);
  });
}

function renderImages(messages) {
  messages.forEach(imgUrl => {
    $('.dog-imgs').append(`<img src="${imgUrl}" alt="dog image">`);
  });
}

function extractData(data) {
  let { message } = data;
  console.log(message);
  return message;
}

$(handleUserSubmit);


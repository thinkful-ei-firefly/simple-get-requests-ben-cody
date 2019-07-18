/* eslint-disable no-console */
'use strict';
/* global $ */

function getDogImage(num) {
  fetch('https://dog.ceo/api/breeds/image/random/'+num)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
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

$(handleUserSubmit);

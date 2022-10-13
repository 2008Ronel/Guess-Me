'use strict';

var gLastRes = null;

$(document).ready(init);
$('.btn-outline-primary').click(onStartGuessing);
$('.btn-outline-success').click({ ans: 'yes' }, onUserResponse);
$('.btn-outline-warning').click({ ans: 'no' }, onUserResponse);
$('.btn-primary').click(onAddGuess);
//var con = document.querySelector('.container');
const $ElContainer = $('.container');
function init() {
  createQuestsTree();
}

function onStartGuessing() {
  $('.game-start').hide();
  $('.ending-win').hide();
  $ElContainer.hide();
  // con.style.display = 'none';

  renderQuest();

  $('.quest').show();
}

function renderQuest() {
  $('.quest h2').text(getCurrQuest().txt);
}

function onUserResponse(ev) {
  const res = ev.data.ans;

  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      $('.quest').hide();
      $('.game-start').show();
      onRestartGame();
    } else {
      alert('I dont know...teach me!');
      $('.new-quest').show();
      $('.quest').hide();
    }
  } else {
    moveToNextQuest(res);
    renderQuest();
    gLastRes = res;
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val().trim();
  var newQuest = $('#newQuest').val().trim();
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  // con.style.display = 'flex';
  $ElContainer.show();

  init();
}

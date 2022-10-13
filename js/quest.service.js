const STORAGE_KEY = 'guessDB';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
  const guess = loadFromStorage(STORAGE_KEY);
  if (!guess) {
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveGuessToStorage();
  } else {
    gQuestsTree = guess;
  }
  gCurrQuest = guess;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = gPrevQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  const newQuest = createQuest(newQuestTxt);
  newQuest.yes = createQuest(newGuessTxt);
  newQuest.no = gCurrQuest;

  gPrevQuest[lastRes] = newQuest;
  saveGuessToStorage();
}

function getCurrQuest() {
  return gCurrQuest;
}

function saveGuessToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree);
}

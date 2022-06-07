function createNewCard() {
	let cardElement = document.createElement("div");

	cardElement.classList.add("card");
  cardElement.innerHTML = `
    <div class = "card-down"></div>
    <div class = "card-up"></div>
  `;
  
	return cardElement;

}
// createNewCardTest();

function appendNewCard(parentElement) {
  let cardElement = createNewCard();

	parentElement.appendChild(cardElement);

	return cardElement;

}
// appendNewCardTest();


function shuffleCardImageClasses() {
	let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"];
  let shuffledArray = _.shuffle(cardClasses);
  
  return shuffledArray; 
}
// shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  let cardObjectsArray = [];

  for (let i = 0; i < 12; i++) {
    let newCard = appendNewCard(parentElement);
    
    newCard.classList.add(shuffledImageClasses[i]);
    newCardObject = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i]
    }
    cardObjectsArray.push(newCardObject);
  }

  return cardObjectsArray; 
	
}
// createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
  
    if (cardObject1.imageClass === cardObject2.imageClass) {
      return true;
    } 
}
// doCardsMatchTest();


/* The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that lecture in TBHQ to review. This object is empty for now but we'll fill it up in the following function. */
let counters = {};

function incrementCounter(counterName, parentElement) {
  
	if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  counters[counterName] ++;

  parentElement.innerHTML = counters[counterName]; 
}
// incrementCounterTest(); 

/* The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. */
let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  let flipElement = document.getElementById("flip-count");
  
	incrementCounter("flips", flipElement);

	if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

	if (lastCardFlipped.imageClass != newlyFlippedCard.imageClass) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  } else {
    incrementCounter("match", document.getElementById("match-count"));

    lastCardFlipped.element.classList.add("border-glow");
    newlyFlippedCard.element.classList.add("border-glow");
  }
  
	if (counters["match"] === 6) {
    winAudio.play();
  } else {
    matchAudio.play();
  }
  
  lastCardFlipped = null; 

}

/* This function should remove all children from the #card-container, reset the flip and match counts displayed in the HTML, reset the counters dictionary to an empty object, reset lastCardFlipped to null, and set up a new game. */
function resetGame() {
  cardContainer = document.getElementById("card-container");

  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  document.getElementById("flip-count").innerHTML = 0;
  document.getElementById("match-count").innerHTML = 0;

  counters = {};
  
  lastCardFlipped = null; 

  setUpGame();
}

// ⛔️ Set up the game. Do not edit below this line! ⛔️
setUpGame();
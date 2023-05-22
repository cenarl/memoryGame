let gameBoard = document.getElementById("game-board");
let cardSymbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let cards = cardSymbols.concat(cardSymbols);

let flippedCards = [];
let matchedCards = [];

shuffleArray(cards);
createBoard();

function createBoard(){
  shuffleArray(cards);

  for(let i = 0; i < cards.length; i++){
    let card = document.createElement("div");
    card.className = "card";

    let cardInner = document.createElement("div");
    cardInner.className = "cardInner";

    let front = document.createElement("div");
    let back = document.createElement("div");
    front.className = "front";
    back.className = "back";

    cardInner.dataset.symbol = cards[i];
    let symbol = document.createElement("span");
    symbol.className = "symbol";
    symbol.innerText = cards[i];

    front.appendChild(symbol);
    cardInner.appendChild(front);
    cardInner.appendChild(back);

    card.appendChild(cardInner);

    cardInner.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  }

}

function flipCard(){
  if(this.classList.contains("flip") || matchedCards.includes(this)) return;
  this.classList.add("flip");

  flippedCards.push(this);

  if(flippedCards.length == 2){
    gameBoard.classList.add("disable-click");

    if(flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol){
      matchedCards.push(flippedCards[0], flippedCards[1]);

      flippedCards = [];
      gameBoard.classList.remove("disable-click");
    }

    else{
      setTimeout(() => {
        flippedCards[0].classList.remove("flip");
        flippedCards[1].classList.remove("flip");

        flippedCards = [];
        gameBoard.classList.remove("disable-click");


      }, 1000)
    }

  }
  if(matchedCards.length === cards.length) setTimeout(() => alert("Congratulations! You have matched all the cards!"), 500);
}

let restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", function(){
    flippedCards = [];
    matchedCards = [];
    gameBoard.innerHTML = "";
    createBoard();
  })

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
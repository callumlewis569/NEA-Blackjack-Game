function rotateCard(element) {
  document.querySelector(element).classList.toggle("flip");
}

function createCard(cardId) {
  // Create the outer element
  const cardElement = document.createElement("div");
  cardElement.classList.add("shoe", "flip-card");
  cardElement.setAttribute("onclick", `rotateCard('#${cardId}')`);

  // Create the inner element
  const innerElement = document.createElement("div");
  innerElement.id = cardId;
  innerElement.classList.add("flip-card-inner", "flip");

  // Create the front side
  const frontElement = document.createElement("div");
  frontElement.classList.add("flip-card-front");

  // Create the image for the front side
  const frontImage = document.createElement("img");
  frontImage.src = `../static/img/${cardId}.png`; // Adjust based on your image naming convention

  // Add the image to the front side
  frontElement.appendChild(frontImage);

  // Create the back side
  const backElement = document.createElement("div");
  backElement.classList.add("flip-card-back");

  // Create the image for the back side
  const backImage = document.createElement("img");
  backImage.src = "../static/img/card-back.png";

  // Add the image to the back side
  backElement.appendChild(backImage);

  // Add the front and back sides to the inner element
  innerElement.appendChild(frontElement);
  innerElement.appendChild(backElement);

  // Add the inner element to the outer element
  cardElement.appendChild(innerElement);

  // Return the created card element
  return cardElement;
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

// Action buttons
function hit(element, position) {
  const sixthElement = document.getElementById("board-inner-container")
    .children[5];
  if (shoe.shoe.length > 0) {
    const card = shoe.hit();
    const container = document.getElementById("board-inner-container");
    try {
      const previousCard = container.children[6];
      const zIndex = previousCard.style.zIndex;
      document.querySelector(element).style.zIndex = parseInt(zIndex) + 1;
    } catch (undefined) {
      document.querySelector(element).style.zIndex = "14";
    }
    document.querySelector(element).style.top = position[0];
    document.querySelector(element).style.right = position[1];
    document.querySelector(element).classList.remove("shoe");
    rotateCard(element + " div");
    insertCard(createCard(card));
  } else {
    const card = shoe.hit();
    const container = document.getElementById("board-inner-container");
    try {
      const previousCard = container.children[6];
      const zIndex = previousCard.style.zIndex;
      document.querySelector(element).style.zIndex = parseInt(zIndex) + 1;
    } catch (undefined) {
      document.querySelector(element).style.zIndex = "14";
    }
    document.querySelector(element).style.top = position[0];
    document.querySelector(element).style.right = position[1];
    document.querySelector(element).classList.remove("shoe");
    rotateCard(element + " div");
    insertCard(document.createElement("div"));
  }
}

function insertCard(cardElement) {
  const container = document.getElementById("board-inner-container");
  const previousElement = container.children[1];
  previousElement.insertAdjacentElement("afterend", cardElement);
}

let shoe = new Cards(1);
shoe.shuffleDeck();

function main() {
  let gameState = 0;

  const values = {
    K: 10,
    Q: 10,
    J: 10,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    A: 11,
  };

  const cards = shoe.shoe.slice(-5, -1);

  for (let i = 0; i < 4; i++) {
    insertCard(createCard(cards[i]));
  }

  let count = 0;
  let hand = [];
  let aCount = 0;

  const hitButton = document.getElementById("hit");

  hitButton.addEventListener("click", function () {
    const card = document
      .querySelector("#board-inner-container .flip-card:nth-child(6)")
      .onclick.toString()
      .slice(40, -4);
    const pix = 325 - 25 * gameState;

    for (const card of hand) {
      if (card === "A") {
        aCount += 1;
      }
    }

    if ("A" in hand && values[card] === 10) {
      // Return blackjack
    } else if (count === 21) {
      // return win
    } else if (gameState < 9 && count < 21) {
      hit("#board-inner-container .flip-card:nth-child(6)", [
        "325px",
        parseInt(pix) + "px",
      ]);
      hand.push(card);
      gameState++;
      count += values[card];
      if (count > 21 && aCount > 0) {
        count -= 10;
        aCount = 0;
      }
    }
  });
}

main();

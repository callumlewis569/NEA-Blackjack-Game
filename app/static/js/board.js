/**
 * @class Card
 * @description Represents a playing card with a suit, rank, and value.
 */
class Card {
  /**
   * @constructor
   * @param {string} suit - The suit of the card (e.g., "H", "D", "C", "S).
   * @param {string} rank - The rank of the card (e.g., "A", "2", "K").
   * @param {number} value - The numerical value of the card (e.g., 11 for Ace, 10 for face cards, 2-10 for number cards).
   * @param {number} cardNumber - The number of the card (e.g., 3, 6, 321).
   */
  constructor(suit, rank, value, cardNumber) {
    /**
     * @type {string}
     * @description The full name of the card, combining suit and rank (e.g., "HA" for Ace of Hearts).
     */
    this.name = suit + rank;

    /**
     * @type {number}
     * @description The numerical value of the card, used for scoring in games.
     */
    this.value = value;

    /**
     * @type {number}
     * @description The number of the card used for the card elements id attribute (e.g., 3, 6, 321).
     */
    this.cardNumber = cardNumber;
  }

  /**
   * @method createCard
   * @description Creates an HTML element representing the card with its front and back sides.
   * @returns {HTMLElement} - The HTML element representing the card.
   */
  createCard() {
    // Create the outer and inner elements
    const cardElement = document.createElement("div");
    cardElement.classList.add("shoe", "flip-card");
    cardElement.id = this.cardNumber;

    const innerElement = document.createElement("div");
    innerElement.id = this.name;
    innerElement.classList.add("flip-card-inner", "flip");

    // Create the front side
    const frontElement = document.createElement("div");
    frontElement.classList.add("flip-card-front");

    // Create the image and add it to the front side
    const frontImage = document.createElement("img");
    frontImage.src = `../static/img/${this.name}.png`; // Adjust based on your image naming convention
    frontElement.appendChild(frontImage);

    // Create the back side
    const backElement = document.createElement("div");
    backElement.classList.add("flip-card-back");

    // Create the image and add it to the back side
    const backImage = document.createElement("img");
    backImage.src = "../static/img/card-back.png";
    backElement.appendChild(backImage);

    // Add the front and back sides to the inner element
    innerElement.appendChild(frontElement);
    innerElement.appendChild(backElement);

    // Add the inner element to the outer element
    cardElement.appendChild(innerElement);

    // Return the created card element
    return cardElement;
  }

  /**
   * @method insertCard
   * @description Inserts the card element into the fourth position on the board.
   * @param {HTMLElement} cardElement - The HTML element representing the card to be inserted.
   */
  insertCard(cardElement) {
    // Selects the third element and inserts the cardElement parameter after it.
    document
      .getElementById("board-inner-container")
      .children[3].insertAdjacentElement("afterend", cardElement);
  }

  /**
   * @method rotateCard
   * @description Rotates the HTML element with the id of the cardNumber attribute.
   */
  rotateCard() {
    // Selects the first element inside the element with the id of the cardNumber attribute.
    document
      .getElementById(this.cardNumber)
      .children[0].classList.toggle("flip");
  }

  /**
   * @method dealCard
   * @description This function positions a card element on the game board at the specified coordinates.
   *              It removes the "shoe" class from the card and adjusts its zIndex.
   * @param {number[]} position - An array containing x and y coordinates. Example: [x, y]
   */
  dealCard(position) {
    // Select the fourth card element with class "shoe"
    const card = document.querySelectorAll(".shoe")[3];

    // Set the top and right positions of the card element
    card.style.top = position[0] + "px";
    card.style.right = position[1] + "px";

    // Remove the "shoe" class from the card
    card.classList.remove("shoe");

    // Get all child elements of the "board-inner-container"
    const elements = document.getElementById("board-inner-container").children;

    // Calculate the zIndex for the card
    const zIndex = elements.length + 4;

    // Set the zIndex of the card element
    card.style.zIndex = zIndex;
  }
}

/**
 * @class Shoe
 * @description Represents a collection of decks of playing cards, used for dealing in games.
 */
class Shoe {
  /**
   * @constructor
   * @param {number} [decks=8] - The number of decks to include in the shoe.
   */
  constructor(decks = 8) {
    /**
     * @type {Card[]}
     * @description The collection of cards in the shoe.
     */
    this.shoe = [];

    /**
     * @type {Card[]}
     * @description The collection of cards in .
     */
    this.cardsInPlay = [];

    const suits = ["C", "D", "H", "S"];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    const deck = [];
    let count = 1;
    for (let i = 0; i < decks; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < 13; k++) {
          deck.push(new Card(suits[j], ranks[k], values[k], count));
          count += 1;
        }
      }
    }

    this.shoe = deck;
  }

  /**
   * @description Shuffles the cards in the shoe randomly.
   * @remarks Implements the Fisher-Yates shuffle algorithm, ensuring an unbiased and efficient randomization of cards.
   */
  shuffle() {
    // For every card in the shoe, it will swap it with a card in a randomly selected place in the shoe,
    // ensuring that the shuffle is fully random as each card has a chance to be in a new place.
    for (let i = this.shoe.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shoe[i], this.shoe[j]] = [this.shoe[j], this.shoe[i]];
    }
  }

  /**
   * @description Displays the current cards in the shoe to the console.
   */
  display() {
    // Declares the deck variable so that the cards can be appended to something in the correct format before being displayed.
    let deck = "";

    // Loops through the shoe 13 cards at a time (one suit) to create a row to be displayed.
    for (let i = 0; i < this.shoe.length / 13; i++) {
      let row = "";

      // Appends each card in the row to the row variable before appending the row to the deck variable.
      for (const card of this.shoe.slice(i * 13, i * 13 + 13)) {
        row += card.name + " ";
      }
      deck += row + "\n";
    }

    // Displays the deck as a formatted string in the console.
    console.log(deck);
  }

  /**
   * @description Deals a single card from the top of the shoe.
   * @returns {Card} The dealt card.
   */
  hit() {
    // Stores the final card in the shoe as a variable so that it can be returned
    const card = this.shoe[this.shoe.length - 1];

    // Removes the card from the shoe.
    this.shoe = this.shoe.slice(0, -1);

    // Returns the final card.
    return card;
  }
}

/**
 * @class Player
 * @description Represents a player in a card game, holding a hand of cards.
 */
class Player {
  /**
   * @constructor
   * @param {string} name - The name of the player.
   * @param {Card[]} [hand=[]] - Optional initial hand of cards.
   */
  constructor(name, hand = []) {
    /**
     * @type {string}
     * @description The name of the player.
     */
    this.name = name;

    /**
     * @type {Card[]}
     * @description The cards currently held by the player.
     */
    this.hand = hand;
  }

  /**
   * @description Adds a card to the player's hand.
   * @param {Card} card - The card to add.
   * @returns {Card[]} The updated hand of cards.
   */
  receiveCard(card) {
    // Adds the new card to the player's hand.
    this.hand.push(card);

    // Returns the hand with the new card added.
    return this.hand;
  }

  /**
   * @description Calculates the total value of the player's hand, adjusting the values of the Aces if the total exceeds 21.
   * @returns {number} The total value of the hand.
   */
  getHandValue() {
    let total = 0;

    // Find the sum of all the card values
    for (const card of this.hand) {
      total += card.value;
    }

    // Adjust values of Aces if the total is greater than 21
    for (const card of this.hand) {
      if (card.name[1] === "A" && card.value === 11 && total > 21) {
        card.value = 1;
        total -= 10;

        // Stop adjusting Aces once total is 21 or below
        if (total <= 21) {
          break;
        }
      }
    }

    return total;
  }

  /**
   * @description Displays the player's current hand to the console in a legible string format.
   */
  displayHand() {
    // Declares the variable hand to append the cards to.
    let hand = "";

    // Appends each card from the current hand to the hand variable.
    for (const card of this.hand) {
      hand += card.name + " ";
    }

    // Logs all the cards to the console after being formatted in the hand variable.
    console.log(hand);
  }
}

/**
 * @class Dealer
 * @description Represents a dealer in a card game, extending the Player class.
 *              The dealer manages the game, holds a hidden value, and interacts with players.
 * @extends Player
 */
class Dealer extends Player {
  /**
   * Create a new Dealer.
   * @param {string} [name="Dealer"] - The name of the dealer.
   * @param {Card[]} hand - The initial hand of cards for the dealer.
   * @param {number} hiddenValue - The hidden value associated with the dealer.
   */
  constructor(name = "Dealer", hand, hiddenValue) {
    super(name, hand);
    this.hiddenValue = hiddenValue;
  }
}

// Game:

// Properties:
// players: Array containing instances of Player objects
// dealer: Instance of the Dealer class
// deck: Instance of the Deck class

// Methods:
// dealInitialCards(): Deals initial cards to players and the dealer
// playRound(): Manages the gameplay loop (players' turns, dealer's turn)
// determineWinner(): Calculates scores and determines the winner
// displayWinner(): Displays the winner(s) or a tie

/**
 * @class Game
 * @description Represents a game environment for managing players and gameplay.
 */
class Game {
  /**
   * @constructor
   * @param {string[]} playerNames - An array containing names of players.
   */
  constructor(playerNames, decks) {
    let players = [];

    // Ensure there's at least one player
    if (playerNames.length === 0) {
      playerNames.push("Guest");
    } else if (playerNames.length > 4) {
      // Limit players to 4 if more are provided
      playerNames = playerNames.slice(0, 4);
    }

    // Create Player instances based on provided names
    for (const player of playerNames) {
      const playerInstance = new Player(player);
      players.push(playerInstance);
    }

    // Create a Shoe and shuffle it
    const shoe = new Shoe(decks);
    shoe.shuffle();

    // Initialize game properties
    /**
     * @type {Player[]}
     * @description An array containing Player instances.
     */
    this.players = players;

    /**
     * @type {Shoe}
     * @description A Shoe instance for managing cards.
     */
    this.shoe = shoe;

    /**
     * @type {Dealer}
     * @description The Dealer instance for the game.
     */
    this.dealer = new Dealer();
    this.dealtCards = [];
    this.currentPlayerIndex = 0;
    this.positionCount = 0;
    this.blackjack = [];


    this.handleStand = this.handleStand.bind(this);
    this.handleHit = this.handleHit.bind(this);
    this.dealInitialCards = this.dealInitialCards.bind(this);
    this.resetRound = this.resetRound.bind(this);
    // this.restartDealButton = this.restartDealButton.bind(this);
  }

  /**
   * @description Creates a shoe by hitting cards and inserting them into the game.
   * @returns {Card[]} An array of cards.
   */
  createShoe() {
    let cards = [];

    // Hit cards from the shoe and add them to the cards array.
    for (let i = 0; i < 4; i++) {
      cards.push(this.shoe.hit());
    }

    // Insert created cards visually into the game.
    for (let i = 0; i < 4; i++) {
      cards[i].insertCard(cards[i].createCard());
    }

    // Set zIndex for the first card in the game
    const firstCard = document.getElementById(cards[0].name).parentElement;
    firstCard.style.zIndex = "14";

    this.dealtCards = cards;
  }

  /**
   * @description Deals initial cards to players and the dealer.
   * @param {Card[]} cards - An array of cards to deal.
   */
  dealInitialCards() {
    function sleep(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    }

    const buttons = document.querySelectorAll("button");
    const playButtons = ["hit", "stand", "double-down", "split"];

    buttons.forEach((button) => {
      if (!button.classList.contains("hidden")) {
        button.classList.add("hidden");
      }

      if (playButtons.includes(button.id)) {
        button.classList.remove("hidden");
      }
    });

    return new Promise((resolve) => {
      const positions = [
        [350, 700],
        [400, 500],
        [400, 300],
        [350, 100],
        [50, 400],
      ];

      const numPlayers = this.players.length;
      let timer = 300;

      for (let count = 0; count < numPlayers * 2 + 2; count++) {
        sleep(timer).then(() => {
          if (count < numPlayers * 2) {
            // Deal cards to players
            this.dealtCards[count].dealCard([
              positions[count % numPlayers][0],
              positions[count % numPlayers][1] -
                25 * Math.floor(count / numPlayers),
            ]);
            this.dealtCards[count].rotateCard();
            this.players[count % numPlayers].receiveCard(
              this.dealtCards[count]
            );
            if (this.players[count % numPlayers].getHandValue() === 21) {
              this.blackjack.push(count % numPlayers);
              console.log(this.blackjack);
            }
          } else {
            // Deal cards to the dealer
            if (count == numPlayers * 2) {
              this.dealtCards[count].dealCard([
                positions[positions.length - 1][0],
                positions[positions.length - 1][1],
              ]);
              this.dealtCards[count].rotateCard();
            } else {
              this.dealtCards[count].dealCard([
                positions[positions.length - 1][0],
                positions[positions.length - 1][1] - 25,
              ]);
            }
            this.dealer.receiveCard(this.dealtCards[count]);
          }
          let card = this.shoe.hit();
          card.insertCard(card.createCard());
          this.dealtCards.push(card);
        });

        timer += 300;
      }

      // Log hand values of players after dealing
      sleep(timer).then(() => {
        // Attach event listeners to buttons for player actions (hit or stand)
        document
          .getElementById("hit")
          .addEventListener("click", this.handleHit);
        document
          .getElementById("stand")
          .addEventListener("click", this.handleStand);

        // Resolve the promise with the dealt cards
        resolve(this.dealtCards.slice(this.dealtCards.length - 4));
      });
    });
  }

  async dealerTurn() {
    function sleep(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    }

    const positions = [
      [350, 650],
      [400, 450],
      [400, 250],
      [350, 50],
      [50, 350],
    ];

    // Hidden card reveal delay
    const card = document.getElementById("board-inner-container").children;
    const hiddenCard = card[card.length - 5 - this.players.length * 2];
    hiddenCard.children[0].classList.toggle("flip");

    while (this.dealer.getHandValue() < 17) {
      await sleep(800);
      const count = this.dealtCards.length - 4;
      let card = this.dealtCards[count];

      // Deal a card to the player, rotate it, and manage game state
      card.dealCard([
        positions[4][0],
        positions[4][1] - 25 * this.positionCount,
      ]);
      card.rotateCard();
      let newCard = this.shoe.hit();
      newCard.insertCard(newCard.createCard());
      this.dealer.receiveCard(this.dealtCards[count]);
      this.dealtCards.push(newCard);
      this.positionCount += 1;

      if (this.dealer.getHandValue() >= 17) {
        // Hide all buttons
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
          if (!button.classList.contains("hidden")) {
            button.classList.add("hidden");
          }
        });

        // Show the reset button
        const resetButton = document.getElementById("reset");
        resetButton.classList.remove("hidden");
      }
    }

    this.dealtCards = this.dealtCards.slice(-4);

    if (this.dealer.getHandValue() > 17) {
      // Hide all buttons
      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        if (!button.classList.contains("hidden")) {
          button.classList.add("hidden");
        }
      });

      // Show the reset button
      const resetButton = document.getElementById("reset");
      resetButton.classList.remove("hidden");
    }
  }

  handleStand() {
    this.currentPlayerIndex++;
    this.positionCount = 0;

    if (this.blackjack.includes(this.currentPlayerIndex)) {
      this.currentPlayerIndex++;
    }

    if (this.currentPlayerIndex >= this.players.length) {
      this.dealerTurn();
    }
  }

  handleHit() {
    const positions = [
      [350, 650],
      [400, 450],
      [400, 250],
      [350, 50],
      [50, 350],
    ];

    console.log(this.dealtCards);

    const count = this.dealtCards.length - 4;
    let card = this.dealtCards[count];

    // Deal a card to the player, rotate it, and manage game state
    card.dealCard([
      positions[this.currentPlayerIndex][0],
      positions[this.currentPlayerIndex][1] - 25 * this.positionCount,
    ]);
    card.rotateCard();
    let newCard = this.shoe.hit();
    newCard.insertCard(newCard.createCard());
    console.log(this.dealtCards);
    console.log("Player Index: " + this.currentPlayerIndex);
    console.log("Players: " + this.players);
    this.players[this.currentPlayerIndex].receiveCard(this.dealtCards[count]);
    this.dealtCards.push(newCard);
    this.positionCount += 1;

    if (this.players[this.currentPlayerIndex].getHandValue() >= 21) {
      // Display winner logic or player bust logic
      this.displayWinner();
      this.currentPlayerIndex++;
      this.positionCount = 0;

      if (this.currentPlayerIndex === this.players.length) {
        document
          .getElementById("hit")
          .removeEventListener("click", this.handleHit);
        document
          .getElementById("stand")
          .removeEventListener("click", this.handleStand);
        this.dealerTurn();
        return;
      }
    }
  }

  /**
   * @description Manages the player turns during a round of the game.
   * @param {Card[]} cards - An array of cards.
   */
  playRound() {
    /**
     * Asynchronous sleep function.
     * @param {number} milliseconds - The duration to sleep.
     * @returns {Promise} A Promise resolved after the specified time.
     */
    function sleep(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    }

    const cards = this.dealtCards;

    /**
     * Asynchronous dealer's turn handling.
     */

    /**
     * Handles the player's decision to hit.
     */

    // Player turns initialization
    let currentPlayerIndex = 0;
    let positionCount = 0;

    // Positions for dealing cards to players
  }

  resetRound() {
    function sleep(milliseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
      });
    }

    this.currentPlayerIndex = 0;
    this.positionCount = 0;

    const playedCards = Array.from(
      document.getElementById("board-inner-container").children
    ).slice(8, -3);

    let timer = 0;

    for (const card of playedCards) {
      sleep(timer).then(() => {
        card.style.top = "-150px";
        card.style.right = "900px";
        sleep(800).then(() => {
          card.remove();
        });
      });
      timer += 200;
    }

    sleep(playedCards.length * 200 + 800).then(() => {
      const buttons = document.querySelectorAll("button");

      buttons.forEach((button) => {
        if (!button.classList.contains("hidden")) {
          button.classList.add("hidden");
        }

        if (button.id === "deal") {
          button.classList.remove("hidden");
        }
      });

      for (const player of this.players) {
        player.hand = [];
      }

      this.dealer.hand = [];
      this.blackjack = [];
    });
  }

  determineWinner() {
    //
  }

  displayWinner() {
    //
  }
}

// Main Function:
// Creates an instance of the Game class.
// Calls the startGame() method to initialize the game.
// Calls the dealInitialCards() method to deal cards to players and the dealer.
// Calls the playRound() method to manage the gameplay loop.
// Calls the determineWinner() and displayWinner() methods to determine and display the game's outcome.
function main() {}

main();

function adjustLeftCover() {
  const board = document.getElementById("board");
  const leftCover = document.getElementById("left-cover");

  const imageLeftGap = board.getBoundingClientRect().left;
  const leftCoverWidth = imageLeftGap + "px";
  leftCover.style.width = leftCoverWidth;
}

window.addEventListener("load", adjustLeftCover);
window.addEventListener("resize", adjustLeftCover);

const game = new Game(["Callum", "Aoife", "James", "Fiona", "Sam"], 1);

game.createShoe();
// const deal = () => {
//   game.dealInitialCards(game.dealtCards);
// };

document.getElementById("deal").addEventListener("click", () => {
  game.dealInitialCards(game.dealtCards);
});
document.getElementById("reset").addEventListener("click", game.resetRound);
document.getElementById("reset").addEventListener("click", game.resetRound);

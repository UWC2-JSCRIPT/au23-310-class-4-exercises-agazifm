const blackjackDeck = getDeck();

 /**
  * Represents a card player (including dealer).
  * @constructor
  * @param {string} name - The name of the player
  */
 class CardPlayer {
    constructor(name){
        this.name = name;
        this.hand = [];
    }
    
    //selects a random card from the deck and adds it to the players hand
    drawCard(){
        const randomIndex = Math.floor(Math.random() * blackjackDeck.length);
        const drawnCard = blackjackDeck[randomIndex];
        this.hand.push(drawnCard);
    }
 }; //TODO

// // CREATE TWO NEW CardPlayers
const dealer = new CardPlayer('Player'); // TODO
const player = new CardPlayer('Dealer'); // TODO

 /**
  * Calculates the score of a Blackjack hand
  * @param {Array} hand - Array of card objects with val, displayVal, suit properties
  * @returns {Object} blackJackScore
  * @returns {number} blackJackScore.total
  * @returns {boolean} blackJackScore.isSoft
  */
const calcPoints = (hand) => {
    // CREATE FUNCTION HERE
    let total = 0;
    let isSoft = false;
    let numAces = 0;

    for (const card of hand){
        total += card.val;

        if (card.val === 11){
            numAces++;
        }
        
        //checks if the total is greater than 21
        while (total > 21 && numAces > 0) {
            total -= 10; //turns an Ace from a value of 10, to 1
            numAces--;
        }
    }

    isSoft = numAces > 0; //checks if there is a soft ace

    return { total, isSoft };
};


 /**
  * Determines whether the dealer should draw another card.
  * 
 @param {Array} dealerHand Array of card objects with val, displayVal, suit properties
  * @returns {boolean} whether dealer should draw another card
  */
 const dealerShouldDraw = (dealerHand) => {
   // CREATE FUNCTION HERE
    const { total, isSoft } = calcPoints(dealerHand);

    //determines if the total is less than 17, or a soft 17
    //if either are true, dealer will draw a card
    return total < 17 || (total === 17 && isSoft);
 };

 /**
  * Determines the winner if both player and dealer stand
  * @param {number} playerScore 
  * @param {number} dealerScore 
  * @returns {string} Shows the player's score, the dealer's score, and who wins
  */
 const determineWinner = (playerScore, dealerScore) => {
//   // CREATE FUNCTION HERE
    if (playerScore > 21) {
        return `Player is over 21 | Dealer wins with ${dealerScore}`;
    }
    if (dealerScore > 21) {
        return `Dealer is over 21 | Player wins with ${playerScore}`;
    }
    if (playerScore > dealerScore) {
        return `Player wins with ${playerScore} | Dealer had ${dealerScore}`;
    }
    if (dealerScore > playerScore) {
        return  `Dealer wins with ${dealerScore} | Player had ${playerScore}`;
    }
    return `It is a draw | Player & Dealer both have ${playerScore}`;
};

/**
  * Creates user prompt to ask if they'd like to draw a card
  * @param {number} count 
  * @param {string} dealerCard 
  */
 const getMessage = (count, dealerCard) => {
   return `Dealer showing ${dealerCard.displayVal}, your count is ${count}.  Draw card?`
 }

/**
//  * Logs the player's hand to the console
//  * @param {CardPlayer} player 
//  */
 const showHand = (player) => {
   const displayHand = player.hand.map((card) => card.displayVal);
   console.log(`${player.name}'s hand is ${displayHand.join(', ')} (${calcPoints(player.hand).total})`);
 }

// /**
//  * Runs Blackjack Game
//  */

//extra credit function to check if a hand total is 21, after the first two cards
const Exactly21 = (hand) => {
  const {total} = calcPoints(hand);
  return total === 21;
};

const startGame = function() {
   player.drawCard();
   dealer.drawCard();
   player.drawCard();
   dealer.drawCard();

   //checks if the player get exactly 21
   if(Exactly21(player.hand)){
    showHand(player);
    return 'Player wins with 21!'
   }

   //checks if the dealer get exactly 21
   if(Exactly21(dealer.hand)){
    showHand(dealer);
    return 'Dealer wins with 21!'
   }

   let playerScore = calcPoints(player.hand).total;
   showHand(player);
   while (playerScore < 21 && confirm(getMessage(playerScore, dealer.hand[0]))) {
     player.drawCard();
     playerScore = calcPoints(player.hand).total;
     showHand(player);
   }
  if (playerScore > 21) {
     return 'You went over 21 - you lose!';
   }
   console.log(`Player stands at ${playerScore}`);

   let dealerScore = calcPoints(dealer.hand).total;
   while (dealerScore < 21 && dealerShouldDraw(dealer.hand)) {
     dealer.drawCard();
     dealerScore = calcPoints(dealer.hand).total;
     showHand(dealer);
   }
   if (dealerScore > 21) {
     return 'Dealer went over 21 - you win!';
   }
   console.log(`Dealer stands at ${dealerScore}`);

   return determineWinner(playerScore, dealerScore);
// }
}
 console.log(startGame());
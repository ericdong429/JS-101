const MESSAGES = require('./rps_messages.json');
const readline = require('readline-sync');

const WINNING_MOVES = {
  rock: { abbr: 'r', beats: ['scissors', 'lizard'] },
  paper: { abbr: 'p', beats: ['rock', 'spock'] },
  scissors: { abbr: 'sc', beats: ['paper', 'lizard'] },
  lizard: { abbr: 'l', beats: ['paper', 'spock'] },
  spock: { abbr: 'sp', beats: ['scissors', 'rock']}
};

const VALID_CHOICES = Object.keys(WINNING_MOVES);
const CHOICE_ABBRS = validAbbreviations(VALID_CHOICES);

let playerScores = 0;
let computerScores = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function validAbbreviations(choices) {
  return choices.map(choice => WINNING_MOVES[choice]['abbr']);
}

function playerWins(playerChoice, computerChoice) {
  return WINNING_MOVES[playerChoice]['beats'].includes(computerChoice);
}

function computerWins(computerChoice, playerChoice) {
  return WINNING_MOVES[computerChoice]['beats'].includes(playerChoice);
}

function abbreviatedChoice(choice) {
  return CHOICE_ABBRS.includes(choice);
}

function displayChoices(playerChoice, computerChoice) {
  prompt(`You chose ${playerChoice}, computer chose ${computerChoice}`);
  prompt(MESSAGES['graphics']['lines']);
}

function displayCurrentScore(playerScore, computerScore) {
  console.log(`The current player score is ${playerScore} and computer is ${computerScore}!`);
  prompt(MESSAGES['graphics']['lines']);
}

function roundWinner(playerChoice, computerChoice,) {
  displayChoices(playerChoice, computerChoice);
  if (playerWins(playerChoice, computerChoice)) {
    console.log("Player Wins");
    prompt(MESSAGES['graphics']['lines']);
    playerScores += 1;
  } else if (computerWins(computerChoice, playerChoice)) {
    console.log("Computer Wins");
    prompt(MESSAGES['graphics']['lines']);
    computerScores += 1;
  } else {
    console.log("It's a tie!");
    prompt(MESSAGES['graphics']['lines']);
  }
}

function displayGameWinner(playerScores, computerScores) {
  if (playerScores === 3) {
    console.log("The Player Won the Game!");
    return true;
  } else if (computerScores >= 3) {
    console.log("The Computer Won the Game!");
    return true;
  }
}

function gameIntroduction() {
  prompt(MESSAGES['welcomePrompt']);
  prompt(MESSAGES['graphics']['lines']);
  prompt(MESSAGES['rules']);
  prompt(MESSAGES['winningConditions']['rocks']);
  prompt(MESSAGES['winningConditions']['paper']);
  prompt(MESSAGES['winningConditions']['scissors']);
  prompt(MESSAGES['winningConditions']['lizard']);
  prompt(MESSAGES['winningConditions']['spock']);
  prompt(MESSAGES['graphics']['lines']);
}

gameIntroduction();

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}
  or ${CHOICE_ABBRS.join(', ')}`);

  prompt(MESSAGES['graphics']['lines']);

  let playerChoice = readline.question();
  while (!VALID_CHOICES.includes(playerChoice) && !CHOICE_ABBRS.includes(playerChoice)) {
    prompt("That's not a valid choice");
    prompt(MESSAGES['graphics']['lines']);
    playerChoice = readline.question();
  }

  while (abbreviatedChoice(playerChoice)) {
    playerChoice = VALID_CHOICES[CHOICE_ABBRS.indexOf(playerChoice)];
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  roundWinner(playerChoice, computerChoice);
  displayCurrentScore(playerScores, computerScores);

  if (displayGameWinner(playerScores, computerScores) === true) {
    playerScores = 0;
    computerScores = 0;
    prompt('Would you like to continue and play another game (y/n)?');
    prompt(MESSAGES['graphics']['lines']);
    let answer = readline.question().toLowerCase();
    while (answer[0] !== 'n' && answer !== 'y') {
      prompt('Please enter "y" or "n"!');
      prompt(MESSAGES['graphics']['lines']);
      answer = readline.question().toLowerCase();
    }
    if (answer[0] !== 'y') {
      break;
    }
    console.clear();
    gameIntroduction();
  } else {
    prompt('Would you like to continue and play another round (y/n)?');
    prompt(MESSAGES['graphics']['lines']);
    let answer = readline.question().toLowerCase();
    while (answer[0] !== 'n' && answer !== 'y') {
      prompt('Please enter "y" or "n"!');
      prompt(MESSAGES['graphics']['lines']);
      answer = readline.question().toLowerCase();
    }

    if (answer[0] !== 'y') break;

  }
}



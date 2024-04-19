const readline = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const ALT_CHOICES = ['r', 'p', 's', 'l', 'sk'];

function prompt(message) {
  console.log(`=> ${message}`);
}

function alternativeChoices(choice) {
  switch (choice) {
    case 'r': return 'rock';
    case 'p': return 'paper';
    case 's': return 'scissors';
    case 'l': return 'lizard';
    case 'sk': return 'spock';
    default: return choice;
  }
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if ((alternativeChoices(choice) === 'rock' && (computerChoice === 'scissors' || 'lizard')) ||
      (alternativeChoices(choice) === 'paper' && (computerChoice === 'rock' || 'spock')) ||
      (alternativeChoices(choice) === 'scissors'  && (computerChoice === 'paper' || 'lizard')) ||
      (alternativeChoices(choice) === 'lizard' && (computerChoice === 'spock' || 'paper')) ||
      (alternativeChoices(choice) === 'spock' && (computerChoice === 'scissors' || 'rock'))) {
    prompt('You win!');
  } else if ((alternativeChoices(choice) === 'rock' && (computerChoice === 'paper' || 'spock')) ||
             (alternativeChoices(choice) === 'paper' && (computerChoice === 'scissors' || 'lizard')) ||
             (alternativeChoices(choice) === 'scissors' && (computerChoice === 'rock' || 'spock')) ||
             (alternativeChoices(choice) === 'lizard' && (computerChoice === 'rock' || 'scissors')) ||
             (alternativeChoices(choice) === 'spock' && (computerChoice === 'paper' || 'lizard'))) {
    prompt('Computer wins!');
  } else {
    prompt("It's a tie");
  }
}

while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(', ')} 
  or short hand choices ${ALT_CHOICES.join(', ')} (*sk = spock)`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(alternativeChoices(choice))) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  displayWinner(choice, computerChoice);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}

// Introduce the name of the app
// Give information on how the calculator works
// Aquire loan amount
// Aquire annual percentage rate in percent form
// Aquire the loan duration
// calculate the monthly interst rate by dividing APR by 12
// change month duration into months

const readline = require('readline-sync');

function prompt(message) {
  console.log(`**${message}**`);
}

function validInput(input) {
  return input.trimStart() === '' || Number.isNaN(Number(input));
}

while (true) {
  prompt(`Welcome to Eric's Mortage and Car Loan Calculator`);
  prompt(`In order to calculate your mortage or car loan, 
\nyou are required to input the loan amount, 
\nthe APR, and the loan duration.`);

  prompt('Please enter the loan amount.');
  let loanAmount = readline.question();

  while (validInput(loanAmount)) {
    prompt('Please enter a valid amount!');
    loanAmount = readline.question();
  }

  loanAmount = parseFloat(loanAmount);

  prompt('Please enter your APR *(Ex: If APR is 20.22% Please enter 20.22).');
  let annualPercentageRate = readline.question();

  while (validInput(annualPercentageRate)) {
    prompt('Please enter a valid amount!');
    annualPercentageRate = readline.question();
  }

  let annualRate = annualPercentageRate / 100;

  annualPercentageRate = parseFloat(annualPercentageRate);
  let monthlyInterestRate = annualRate / 12;

  prompt('Please enter your loan duration in months');
  let loanDuration = readline.question();

  while (validInput(loanDuration)) {
    prompt('Please enter a valid amount!');
    loanDuration = readline.question();
  }

  let monthlyPayment = loanAmount *
    (monthlyInterestRate /
    (1 - Math.pow((1 + monthlyInterestRate), (-loanDuration))));

  prompt(`Your monthly payment will be $${monthlyPayment.toFixed(2)}.`);

  prompt("Another calculation?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] === 'n') break;
}



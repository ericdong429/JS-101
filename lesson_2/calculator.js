//Ask the user for the first number.
//Ask the user for the second number.
//Ask the user for an operation to perform.
//Perfrom the operation on the two numbers.
//Print the result to the terminal.
const LANGUAGE = 'en';

const MESSAGES = require('./calculator_messages.json');
const readline = require('readline-sync');

function messages(message, lang='en') {
  return MESSAGES[lang][message];
}

function prompt(key) {
  let message = messages(key, LANGUAGE);
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

prompt('welcome');

while (true) {
  prompt("What's the first number?");
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt("Hmm... that doesn't look like a valid number.");
    number1 = readline.question();
  }

  prompt("What's the second number?");
  let number2 = readline.question();

  while (invalidNumber(number1)) {
    prompt("Hmm... that doesn't look like a valid number.");
    number1 = readline.question();
  }

  prompt(
    "What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide"
  );
  let operation = readline.question();
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('Must choose 1, 2, 3 or 4');
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt(`The result is ${output}`);

  prompt('would you like to perform another operation? (y/n)');
  let answer = readline.question();

  if (answer[0].toLowerCase() !== 'y') break;
}

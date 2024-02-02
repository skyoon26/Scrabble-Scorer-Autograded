// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question(`Let's play some Scrabble!\n\nEnter a word to score: `);
   return word;
};

let simpleScorer = function(word) {
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      score+=1;
   }
   return score;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      if (word[i] === 'A') {
         score+=3;
      } else if (word[i] === 'E') {
         score+=3;
      } else if (word[i] === 'I') {
         score+=3;
      } else if (word[i] === 'O') {
         score+=3;
      } else if (word[i] === 'U') {
         score+=3;
      } else {
         score+=1;
      }
   }
   return score;
};

let scrabbleScorer = function(word) {
	word = word.toLowerCase();
	let score = 0;
 
	for (let i = 0; i < word.length; i++) {
	  for (const letterValue in newPointStructure) {
		 if (letterValue.includes(word[i])) {
			score += Number(newPointStructure[letterValue]);
		 }
	  }
	}
	return score;
 };

let scorerOne = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scoringFunction: simpleScorer,
};

let scorerTwo = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scoringFunction: vowelBonusScorer,
};

let scorerThree = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scoringFunction: scrabbleScorer,
};
const scoringAlgorithms = [scorerOne, scorerTwo, scorerThree];

function scorerPrompt() {
   let score = 0;
   let info = input.question(`Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `);
   return scoringAlgorithms[info];
}

function transform(obj) {
   for (key in obj) {
      let newValue = (obj[key]).toString().toLowerCase().split(',');
      obj[key] = newValue;
   }

   let newObj = {};
   for (let key in obj) {
      newObj[obj[key]] = key;
   }

   // Switched values need to remain as a Number?
   // for (let key in newObj) {
   //    let newValue = Number(newObj[letters]);
   //    newObj[key] = newValue;
   // }
   return newObj;
}

let obj = transform(oldPointStructure);
console.log(obj['q,z']);

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let scoringObj = scorerPrompt();
   let score = 0;
   if (scoringObj === scoringAlgorithms[0]) {
      score = scoringAlgorithms[0].scoringFunction(word);
   } else if (scoringObj === scoringAlgorithms[1]) {
      score = scoringAlgorithms[1].scoringFunction(word);
   } else if (scoringObj === scoringAlgorithms[2]) {
      score = scoringAlgorithms[2].scoringFunction(word);
   }
   return console.log(`Score for '${word}': ${score}`);
}

// TESTING MY CODE:
// console.log(newPointStructure.d);
// console.log(scorerPrompt());
// console.log(initialPrompt());
// console.log(scoringAlgorithms[0].name);
// console.log(scoringAlgorithms[0].scoringFunction('donut'));

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

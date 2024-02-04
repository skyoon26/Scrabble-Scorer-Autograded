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
   word = word.toLowerCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      if (word[i] === 'a') {
         score+=3;
      } else if (word[i] === 'e') {
         score+=3;
      } else if (word[i] === 'i') {
         score+=3;
      } else if (word[i] === 'o') {
         score+=3;
      } else if (word[i] === 'u') {
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
			score += newPointStructure[letterValue];
		 }
	  }
	}
	return score;
 };

const scoringAlgorithms = [
   {name: 'Simple Score', description: 'Each letter is worth 1 point.', scorerFunction: simpleScorer}, 
   {name: 'Bonus Vowels', description: 'Vowels are 3 pts, consonants are 1 pt.', scorerFunction: vowelBonusScorer}, 
   {name: 'Scrabble', description: 'The traditional scoring algorithm.', scorerFunction: scrabbleScorer}
];

function scorerPrompt() {
   let info = input.question(`Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `);
   return scoringAlgorithms[info];
}

function transform(object) {
   let newObject = {};
   let newKey = '';
   let newValue = 0;

   for (let key in object) {
      for (let i = 0; i < ((object[key]).length); i++) {
         newKey = (object[key][i]).toLowerCase();
         newValue = Number(key);
         newObject[newKey] = newValue;
      }
   }
   return newObject;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let scoringObj = scorerPrompt();
   let score = 0;
   if (scoringObj === scoringAlgorithms[0]) {
      score = scoringAlgorithms[0].scorerFunction(word);
   } else if (scoringObj === scoringAlgorithms[1]) {
      score = scoringAlgorithms[1].scorerFunction(word);
   } else if (scoringObj === scoringAlgorithms[2]) {
      score = scoringAlgorithms[2].scorerFunction(word);
   }
   return console.log(`Score for '${word}': ${score}`);
}

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

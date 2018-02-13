const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

/* Returns a list of dictionary words from the words.txt file. */
const readWords = () => {
  const contents = fs.readFileSync('words.txt', 'utf8');
  return contents.split('\n');
};

// TODO: your code to handle requests
const guesses = [];
const words = readWords();
const finalWord = words[Math.floor(Math.random() * words.length)];
let wordSoFar = finalWord;

server.post('/guess', (req, res) => {
	const { letter } = req.body;
	const newLetter = { letter };
	if (!letter) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: 'Must provide a letter' });
	}
	const findLetter = obj => {
		return obj.letter === letter;
	};
	if (guesses.find(findLetter)) {
		res.status(STATUS_USER_ERROR);
		res.send({ error: `You already tried guessing this letter! (${letter})` });
	}
	guesses.push(newLetter);
	res.send
});

server.get('/guess', (req, res) => {
	let lettersSoFar = wordSoFar.split('');
	const finalLetters = finalWord.split('');
	for (let i = 0; i < finalLetters; i++) {
		if (guesses.includes(finalLetters[i])) {
			if (lettersSoFar[i] === '-') {
				lettersSoFar.splice(i, 1, finalLetters[i]);
			}
		} else if (lettersSoFar[i] !== '-') {
			lettersSoFar.splice(i, 1, '-');
		}
	}
	wordSoFar = lettersSoFar.join('');
	res.send({ wordSoFar: wordSoFar, guesses: guesses });
});


server.listen(3000);










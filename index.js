// Import the libraries we need
let fs = require('fs');
let readline = require('readline');
let winston = require('winston');

// Create the Winston logger
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

logger.info("Welcome to Daniel11420's Name Checker. This is a better version of repl.it/@kiziolek06/RobloxNamesDaniel11420 written in NodeJS.");
logger.info("Name Checker is starting...")

let names = [];

function checkNames(names) {
  logger.info("Starting to check names");
}

logger.info("Reading Names file...");
let Reader = readline.createInterface({
  input: fs.createReadStream('Names.txt')
});

Reader.on('line', function (line) {
  names.push(line);
});

Reader.on('close', function() {
  checkNames(names);
});
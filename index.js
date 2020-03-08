// Import the libraries we need
let fs = require('fs');
let readline = require('readline');
let winston = require('winston');
let https = require('https');

// Create the Winston loggers
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

const takenLogger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'taken.log' })
  ]
});

const inappropiateLogger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'inappropiate.log' })
  ]
});

logger.info("Welcome to Daniel11420's Name Checker. This is a better version of repl.it/@kiziolek06/RobloxNamesDaniel11420 written in NodeJS.");
logger.info("Name Checker is starting...")

// define empty array
let names = [];

// the function that actually checks the names once they are loaded
function checkNames(names) {
  logger.info("Starting to check names");

  names.forEach(function(name, index) {
    https.get('https://auth.roblox.com/v1/usernames/validate?birthday=1967-03-01T23:00:00.000Z&context=Signup&username=' + name, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        let code = JSON.parse(data).code;

        if (code == "0") {
          logger.info("[VALID] " + name);
        } else if (code == "2") {
          inappropiateLogger.info("[INAPP] " + name);
        } else if (code == "1") {
          takenLogger.info("[TAKEN] " + name);
        }
      });
    })
  });
}

// load the names
logger.info("Reading Names file...");
let Reader = readline.createInterface({
  input: fs.createReadStream('Names.txt')
});

Reader.on('line', function (line) {
  names.push(line);
});

// run checknames when we're done loading names
Reader.on('close', function() {
  checkNames(names);
});
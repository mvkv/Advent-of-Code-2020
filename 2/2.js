const os = require('os');
const fs = require('fs');

const file = '2_input.txt';
const TARGET = 2020;

// Takes input from file, splits and inverse-sort it
const inputArr = fs.readFileSync(file, 'utf-8').split(os.EOL);

const validatePasswords = (passwords) => {
    let validPasswords = 0;
    passwords.forEach((password) => {
        const regEx = /[\s-:]+/
        const [minOccur, maxOccur, letter, passwordKey] = password.split(regEx)

        let occurencies = 0
        for (const c of passwordKey) {
            if (c.match(letter)) {
                occurencies++;
            }
        }

        if (occurencies >= minOccur && occurencies <= maxOccur ) {
            validPasswords++;
        }
    });
    return validPasswords
};

const validPasswords = validatePasswords(inputArr)
console.log(validPasswords)


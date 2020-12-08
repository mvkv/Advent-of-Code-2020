const os = require('os');
const fs = require('fs');

const file = '2_input.txt';
const TARGET = 2020;

// Takes input from file, splits and inverse-sort it
const inputArr = fs.readFileSync(file, 'utf-8').split(os.EOL);

const validatePasswords = (passwords) => {
    let validPasswordsPartOne = 0;
    let validPasswordsPartTwo = 0;
    passwords.forEach((password) => {
        const regEx = /[\s-:]+/;
        const [minOccur, maxOccur, letter, passwordKey] = password.split(regEx);

        // Part one
        let occurPartOne = 0;
        for (const c of passwordKey) {
            if (c.match(letter)) {
                occurPartOne++;
            };
        };
        if (occurPartOne >= minOccur && occurPartOne <= maxOccur ) {
            validPasswordsPartOne++;
        };

        //Part two
        const occurString = new Set()
        occurString.add(passwordKey[minOccur - 1])
        occurString.add(passwordKey[maxOccur - 1])
        if (occurString.size > 1 && occurString.has(letter)) {
            validPasswordsPartTwo++;
        };
    });
    console.log("Part 1 solution: " + validPasswordsPartOne);
    console.log("Part 2 solution: " + validPasswordsPartTwo);

    
};

validatePasswords(inputArr);

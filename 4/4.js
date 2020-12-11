const os = require('os');
const fs = require('fs');

const file = '4_input.txt';

const FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

// Takes input from file, splits
const inputArr = fs.readFileSync(file, 'utf-8').split(os.EOL + os.EOL);
const passports = []

const passportToDict = (passport, passports) => {
    const keyValuePairs = passport.split(/[\s\r\n]+/)
    let dict = {}
    keyValuePairs.forEach((keyValue) => {
        const [key, value] = keyValue.split(':')
        dict[key] = value
    })
    passports.push(dict)
}

const validatePassports = (inputArr, partSwitch) => {
    let validPassports = 0

    inputArr.forEach((passport) => {
        passportToDict(passport, passports)
    })

    // Use part switch to output part1 or part2
    passports.forEach((passport) => {
        if (FIELDS.every(item => passport.hasOwnProperty(item))) {
            if (partSwitch === 1) {
                validPassports++;
            } else {
                const validateBirth = (parseInt(passport.byr) <= 2002) && (parseInt(passport.byr) >= 1920);
                const validateYear = (parseInt(passport.iyr) <= 2020) && (parseInt(passport.iyr) >= 2010);
                const validateExpiration = (parseInt(passport.eyr) <= 2030) && (parseInt(passport.eyr) >= 2020);
                const validateHeightField = RegExp(/(\d+)(cm)/).test(passport.hgt) || RegExp(/(\d+)(in)/).test(passport.hgt);
                let validateHeight = false;
                if (validateHeightField && passport.hgt.match(/\D+/)[0] == "cm") {
                    if (parseInt(passport.hgt.match(/\d+/)[0]) >= 150 && parseInt(passport.hgt.match(/\d+/)[0]) <= 193) {
                        validateHeight = true;
                    };
                } else if (validateHeightField &&passport.hgt.match(/\D+/)[0] == "in") {
                    if (parseInt(passport.hgt.match(/\d+/)[0]) >= 59 && parseInt(passport.hgt.match(/\d+/)[0]) <= 76) {
                        validateHeight = true;
                    };
                }
                const validateHair = RegExp(/^#[0-9a-f]/).test(passport.hcl);
                const EYE_COLORS = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
                const validateEye = EYE_COLORS.includes(passport.ecl);
                const validatePID = passport.pid.length == 9;
                const validations = [validateBirth, validateYear, validateExpiration, validateHeight, validateEye, validatePID, validateHair];
                if (validations.every(item => item == true)){
                    validPassports++;
                }
            }
        }
    })
    console.log(validPassports);
};


// Calling it with 1 asnwers part one, with other symbols answers part 2
validatePassports(inputArr, 2)

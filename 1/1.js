const os = require('os')
const fs = require('fs');
const { parse } = require('path');


const file = '1_input.txt'
const TARGET = 2020

// Takes input from file, splits and inverse-sort it
const inputNumbers = fs.readFileSync(file, 'utf-8').split(os.EOL).sort((a,b) => (b-a));

const multiplyArray = (arr) => {
    let output = 1;
    for (let i = 0; i<arr.length; i++) {
        output = output * arr[i]
    }
    return output
} 

const getTarget = (inputNumbers) => {
    const inputLenght = inputNumbers.length;
    const output = []
    let breakCycle = false;
    inputNumbers.forEach((el) => {
        const elem1 = parseInt(el);

        if (breakCycle) {
            return false
        };

        let i = inputLenght - 1;
        for (i; i >= 0; i--) {
            const elem2 = parseInt(inputNumbers[i]);
            const firstSum = elem1 + elem2
            if (firstSum >= TARGET || breakCycle) {
                break;
            };

            let k = inputLenght - 1;
            for (k; k >= 0; k--) {
                if (breakCycle) {
                    break
                }

                const elem3 = parseInt(inputNumbers[k]);
                const secondSum = elem1 + elem2 + elem3
                if (secondSum === TARGET) {
                    output.push(elem1, elem2, elem3)
                    breakCycle = true
                } else if (secondSum >= TARGET) {
                    break
                }
            }
            
        };
    });
    
    return output
}

console.log(multiplyArray(getTarget(inputNumbers)))

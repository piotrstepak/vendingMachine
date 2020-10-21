const prompt = require('prompt-sync')({sigint: true});

class InputProvider {
    
    getNumber(text = '') {
        let input = Number(prompt(text));
        // input = Number(input);
        // console.log(input)
        // console.log(isNaN(input))
        // console.log(typeof input !== Number)
        while (typeof input !== Number && isNaN(input)) {
            input = prompt('Input was not a number. Please try again: ');
        }
        return input;
    }
}
// const inn = new InputProvider();
// inn.getNumber('Provide a number: ');

module.exports = InputProvider;
class View {
    printArray(arr) {
        for (let el of arr) {
            console.log(el);
        }
        console.log();
    }

    wrongData() {
        console.log("Invalid Data. Please try again.\n");
    }

    print(message) {
        console.log(message);
    }
}

module.exports = View;

// const menuWelcome = [
//     'Welcome! Please select a product:',
//     '(Remeber that we accept only nickels, dimes and quarter coins)',
//     '1. Cola, cost $1',
//     '2. Chips, cost $0.5',
//     '3. Candy, cost $0.65'
// ];
// const a = new View()
// a.printArray(menuWelcome)
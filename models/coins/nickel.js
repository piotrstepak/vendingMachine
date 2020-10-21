const Coin = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/coin');

class Nickel extends Coin {
    constructor() {
        super('Nickel', 0.05, 21.21, 5);
    }
}

module.exports = Nickel;
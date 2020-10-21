const Coin = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/coin');

class Penny extends Coin {
    constructor() {
        super('Penny', 0.01, 19.05, 2.50);
    }
}

module.exports = Penny;
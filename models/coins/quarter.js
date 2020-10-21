const Coin = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/coin');

class Quarter extends Coin { 
    constructor() {
        super('Quarter', 0.25, 24.26, 5.67);
    }
}

module.exports = Quarter;
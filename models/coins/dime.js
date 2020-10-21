const Coin = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/coin');

class Dime extends Coin {
    constructor() {
        super('Dime',0.1, 17.91, 2.268);
    }
}

module.exports = Dime;
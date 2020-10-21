const Product = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/products/product.js');

class Chips extends Product {
    constructor() {
        super('Chips', 0.5);
    }
}

module.exports = Chips;
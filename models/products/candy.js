const Product = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/products/product.js');

class Candy extends Product {
    constructor() {
        super('Candy', 0.65);
    }
}

module.exports = Candy;
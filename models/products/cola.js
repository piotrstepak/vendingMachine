const Product = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/products/product.js');

class Cola extends Product {
    constructor() {
        super('Cola', 1);
    }
}

module.exports = Cola;
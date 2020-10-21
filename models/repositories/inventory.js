const Repository = require('../repositories/repository');
const Cola = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/products/cola.js'); 
const Chips = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/products/chips.js');
const Candy = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/products/candy.js');

class Inventory extends Repository {

    constructor() {
        super();
    }

    fillRepo(keys, values) {
        let temporaryArr;
        let product;

        for (let i = 0; i < keys.length; i++) {//TODOskrocic caly dol/ uniwersalna metoda w nadrzednej
            for (let j = 0; j < values[i]; j++) {
                if (j === 0) {
                    if (keys[i] === 'Cola') { //ewentualnie stowrzyc po obiekcie kazdego i pobrac cola.name
                        temporaryArr = [product = new Cola()];
                        // temporaryArr.push(product = new Cola())
                    } 
                    else if (keys[i] === 'Chips') {
                        temporaryArr = [product = new Chips()];
                        // temporaryArr.push(product = new Chips());
                    } else if (keys[i] === 'Candy') {
                        temporaryArr = [product = new Candy()];
                        // temporaryArr.push(product = new Candy());
                    }
                } else {
                    temporaryArr = this.repository.get(keys[i]);
                    if (keys[i] === 'Cola') {
                        temporaryArr.push(product = new Cola());
                    } else if (keys[i] === 'Chips') {
                        temporaryArr.push(product = new Chips());
                    } else if (keys[i] === 'Candy') {
                        temporaryArr.push(product = new Candy());
                    }
                } 
                this.repository.set(keys[i], temporaryArr);
            }  
        }
    }

    resetWallet() {
        // console.log(this.repository.size)//pomocniczy
        // const keys = this.repository.keys();
        // for (let i = 0; i < this.repository.size; i++) {
        //     console.log('duoa')
        //     console.log(this.repository.get(keys.next()))//pomocniczy
        //     this.repository.set(this.repository.get(keys.next()), [])
        // }
        // for (let [key, value] of this.repository) {
        //     this.repository.set(key, []);
        // }
        for (let key of this.repository.keys()) {
            this.repository.set(key, []);
        }
    }
}

module.exports = Inventory;

// const inv = new Inventory()
// inv.fillRepo(['Cola', 'Candy'], [3, 5])
// console.log(inv)
// // inv.repository.forEach(el =>)
// inv.resetWallet()
// // inv.fillRepo(['Cola', 'Candy'], [0, 0])
// console.log(inv)
// console.log(inv.repository.get('Cola'))
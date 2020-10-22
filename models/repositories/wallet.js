const Repository = require('../repositories/repository');
// const Penny = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/penny.js');
const Dime = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/dime.js');
const Nickel = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/nickel.js');
const Quarter = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/quarter.js');

class Wallet extends Repository {

    constructor() {
        super();
    }

    fillRepo(keys, values) {
        let temporaryArr;
        let coin;

        for (let i = 0; i < keys.length; i++) {//TODOskrocic caly dol/ uniwersalna metoda w nadrzednej
            for (let j = 0; j < values[i]; j++) {
                if (j === 0) {
                    if (keys[i] === 'Nickel') {
                        temporaryArr = [coin = new Nickel()];
                    } 
                    else if (keys[i] === 'Dime') {
                        temporaryArr = [coin = new Dime()];
                    } else if (keys[i] === 'Quarter') {
                        temporaryArr = [coin = new Quarter()];
                    }
                } else {
                    temporaryArr = this.repository.get(keys[i]);
                    if (keys[i] === 'Nickel') {
                        temporaryArr.push(coin = new Nickel());
                    } else if (keys[i] === 'Dime') {
                        temporaryArr.push(coin = new Dime());
                    } else if (keys[i] === 'Quarter') {
                        temporaryArr.push(coin = new Quarter());
                    }
                } 
                this.repository.set(keys[i], temporaryArr);
            }  
        }
    }

    resetWallet() {
        for (let key of this.repository.keys()) {
            this.repository.set(key, []);
        }
    }

    walletValue() {
        let walletValue = 0;
        const elementValue = key => {
            return this.repository.get(key)[0].value;
        };
        const arrLength = key => {
            return this.repository.get(key).length;
        };
        //specific coin all

        for (let key of this.repository.keys()) {//jak wyzej let [key, value] of this.repository
            if (this.repository.get(key).length > 0) {
                walletValue += arrLength(key) * elementValue(key);
            }
        }
        return walletValue;
    }
}

module.exports = Wallet;
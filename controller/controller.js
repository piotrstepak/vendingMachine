const View = require('../view/view');
const InputProvider = require('../view/inputProvider');
// const Repository = require('../models/repositories/repository');
const Inventory = require('../models/repositories/inventory');
const Wallet = require('../models/repositories/wallet');

const Cola = require('../models/products/cola'); 
const Chips = require('../models/products/chips');
const Candy = require('../models/products/candy');

const Penny = require('../models/coins/penny');
const Nickel = require('../models/coins/nickel');
const Dime = require('../models/coins/dime');
const Quarter = require('../models/coins/quarter');

const view = new View();
const inputProvider = new InputProvider();

const cola = new Cola();
const chips = new Chips();
const candy = new Candy();

const penny = new Penny();
const nickel = new Nickel();
const dime = new Dime();
const quarter = new Quarter();

const possibleCoins = [nickel, dime, quarter];
const coinsTypes = [nickel.name, dime.name, quarter.name];
const quantityCoins = [5, 5, 5];

const products = [cola.name, chips.name, candy.name]; //mozna by od razu z palca wpisac do mapy wszystko/obiektami wypelnic
const quantityProducts = [2, 3, 1];
const empty = [0, 0, 0];


class Controller {

    constructor() {
        this.saldo = 0;
        this.productsInventory = new Inventory();
        this.productsInventory.fillRepo(products, quantityProducts);

        this.internalWallet = new Wallet();
        this.internalWallet.fillRepo(coinsTypes, quantityCoins);

        this.temporaryWallet = new Wallet();
        this.temporaryWallet.fillRepo(coinsTypes, quantityCoins);//zrobic zeby mozna bylo zerami wypelnic
        this.temporaryWallet.resetWallet();

        this.menuStart = [ //aktualizacja menu !!!!!!!!!!??????
            '\nSelect a product or insert money: ',
            '(Remember that we accept only nickels, dimes and quarter coins)',
            `Amount: $${this.saldo}`,
            `1. Cola, cost: $${cola.price}, available ${this.productsInventory.repository.get(cola.name).length}`,
            `2. Chips, cost: $${chips.price}, available ${this.productsInventory.repository.get(chips.name).length}`,
            `3. Candy, cost: $${candy.price}, available ${this.productsInventory.repository.get(candy.name).length}`,
            '',
            '4. Penny - $0.01',
            '5. Nickel - $0.05',
            '6. Dime - $0.10',
            '7. Quarter - $0.25',
            '0. Return your coins'
        ];
    }

    start() {
        let isRunning = true;
        let insertedCoin = null;
        
        while (isRunning) {
            view.printArray(this.menuStart);
            switch (inputProvider.getNumber('Select option: ')) {
                case 0:
                    this.returnCoinsToUser();
                    break;
                case 1:
                    this.cola();
                    // logika , menu z monetami i switch i jesli wybieram konkretna to tworzy nowa i porownuje wage i srednice i albo daje albo do return i info?
                    break;
                case 2:
                    this.chips();
                    break;
                case 3:
                    this.candy();
                    break;
                case 4:
                    this.checkCoin_SetItsValue_AddToWallet(insertedCoin = new Penny());
                    break;
                case 5:
                    this.checkCoin_SetItsValue_AddToWallet(insertedCoin = new Nickel());
                    // console.log(this.saldo)
                    break;
                case 6:
                    this.checkCoin_SetItsValue_AddToWallet(insertedCoin = new Dime());
                    break;
                case 7:
                    this.checkCoin_SetItsValue_AddToWallet(insertedCoin = new Quarter());
                    break;
                default:
                    view.wrongData();
            }
        }
    }

    cola() {
        this.checkSaldo_And_Process_Or_RejectTransaction(cola);
    }

    chips() {
        this.checkSaldo_And_Process_Or_RejectTransaction(chips);
    }

    candy() {
        this.checkSaldo_And_Process_Or_RejectTransaction(candy);
    }

    checkSaldo_And_Process_Or_RejectTransaction(product) {
        if (this.saldo >= product.price && this.productsInventory.repository.get(product.name).length > 0) {//if do metody
            //z temporaryW przelej do internalW
            for (let [key, value] of this.internalWallet.repository) {
                this.internalWallet.repository.set(key, value.concat(this.temporaryWallet.repository.get(key)));
            }

            //odejmij produkt z inventory (do osobnej metody prywatnej)
            let temporaryArr = this.productsInventory.repository.get(product.name);
            temporaryArr.pop();
            this.productsInventory.repository.set(product.name, temporaryArr);
            console.log(this.productsInventory.repository.get(product.name).length)//pomocniczy

            this.saldo = 0;
            this.temporaryWallet.resetWallet();
            view.print(`You receive ${product.name}`);

            //TODOzwroc reszte w postaci np listy konkretnych coinow wypisanych/ algorytm wydawania 
        } else {
            this.saldo >= product.price ? 
            view.print('Sorry, this product is SOLD OUT, choose another or get your funds back.') :
            view.print('Insufficient funds, INSERT COIN');
        }
    }

    returnCoinsToUser() {
        // let coinsToReturn;
        // for (let value of this.temporaryWallet.repository.values()) {
        //     //wyswietl wszystkie coiny ze wszystkich kluczy
        // }
        view.print('Returned coins:');
        this.temporaryWallet.repository.forEach(
            (value) => {
                view.print(`${value.toString()}`);
            }
        );
        this.saldo = 0;
        this.temporaryWallet.resetWallet();
    }

    checkCoin_SetItsValue_AddToWallet(insertedCoin) {
        for (let i = 0; i < possibleCoins.length; i++) {
            //sprawdz wage i srednice wrzuconej monety i na tej podstawie ocen monete / // if do osobnej metody
            if (insertedCoin.mass === possibleCoins[i].mass && insertedCoin.diameter === possibleCoins[i].diameter) {
                this.saldo += insertedCoin.value;

                //dodaj do temporaryWallet (wyniesc do osobnej m)
                let temporaryArr = this.temporaryWallet.repository.get(insertedCoin.name);
                temporaryArr.push(new Quarter);//push(insertedCoin)
                this.temporaryWallet.repository.set(insertedCoin.name, temporaryArr);
                return;
            }
        }
        //dodaj do return saldo ?
        view.print('Unsupported type of coin. Your coin is withdrawn.')
        //wyplac i usun z tymczasowego ?
    }
}

//TODO exact change only method

module.exports = Controller;

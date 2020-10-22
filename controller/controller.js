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

const possibleCoins = [quarter, dime, nickel];
const coinsTypes = [quarter.name, dime.name, nickel.name];
const quantityCoins = [5, 5, 5];

const products = [cola.name, chips.name, candy.name]; //mozna by od razu z palca wpisac do mapy wszystko/obiektami wypelnic
const quantityProducts = [2, 3, 1];
const empty = [0, 0, 0];


class Controller {

    constructor() {
        this.saldo = 0;//Math.round(this.saldo * 100) / 100;
        this.productsInventory = new Inventory();
        this.productsInventory.fillRepo(products, quantityProducts);

        this.internalWallet = new Wallet();
        this.internalWallet.fillRepo(coinsTypes, quantityCoins);
        console.log(this.internalWallet.walletValue());

        this.temporaryWallet = new Wallet();
        this.temporaryWallet.fillRepo(coinsTypes, quantityCoins);//zrobic zeby mozna bylo zerami wypelnic
        this.temporaryWallet.resetWallet();

        // this.menuStart = [ //aktualizacja menu !!!!!!!!!!??????
        //     '\nSelect a product or insert money: ',
        //     '(Remember that we accept only nickels, dimes and quarter coins)',
        //     `Amount: $${this.saldo}`,
        //     `1. Cola, cost: $${cola.price}, available ${this.productsInventory.repository.get(cola.name).length}`,
        //     `2. Chips, cost: $${chips.price}, available ${this.productsInventory.repository.get(chips.name).length}`,
        //     `3. Candy, cost: $${candy.price}, available ${this.productsInventory.repository.get(candy.name).length}`,
        //     '',
        //     '4. Penny - $0.01',
        //     '5. Nickel - $0.05',
        //     '6. Dime - $0.10',
        //     '7. Quarter - $0.25',
        //     '0. Return your coins'
        // ];
        //sprawdz stan monet w automacie i w razie czego alarmuj EXACT CHange
    }

    menuStart() {
        return [
            '\nSelect a product or insert money: ',
            '(Remember that we accept only nickels, dimes and quarter coins)',
            `Amount: $${this.saldo}`,
            `1. Cola, cost: $${cola.price}, available ${this.productsInventory.repository.get(cola.name).length}`,
            `2. Chips, cost: $${chips.price}, available ${this.productsInventory.repository.get(chips.name).length}`,
            `3. Candy, cost: $${candy.price}, available ${this.productsInventory.repository.get(candy.name).length}`,
            '',
            `4. Penny - $0.01`,
            `5. Nickel - $0.05, available ${this.internalWallet.repository.get(nickel.name).length}`,
            `6. Dime - $0.10, available ${this.internalWallet.repository.get(dime.name).length}`,
            `7. Quarter - $0.25, available ${this.internalWallet.repository.get(quarter.name).length}`,
            '0. Return your coins'
        ];
    }

    start() {
        let isRunning = true;
        let insertedCoin = null;
        
        while (isRunning) {
            view.printArray(this.menuStart());
            switch (inputProvider.getNumber('Select option: ')) {
                case 0:
                    this.returnCoinsToUser();
                    break;
                case 1:
                    this.checkSaldo_And_Process_Or_RejectTransaction(cola);
                    // logika , menu z monetami i switch i jesli wybieram konkretna to tworzy nowa i porownuje wage i srednice i albo daje albo do return i info?
                    break;
                case 2:
                    this.checkSaldo_And_Process_Or_RejectTransaction(chips);
                    break;
                case 3:
                    this.checkSaldo_And_Process_Or_RejectTransaction(candy);
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

    // cola() {//wywalic cola() i zostawic ponizsze
    //     this.checkSaldo_And_Process_Or_RejectTransaction(cola);
    // }

    // chips() {
    //     this.checkSaldo_And_Process_Or_RejectTransaction(chips);
    // }

    // candy() {
    //     this.checkSaldo_And_Process_Or_RejectTransaction(candy);
    // }

    checkSaldo_And_Process_Or_RejectTransaction(product) {
        if (this.saldo >= product.price && this.productsInventory.repository.get(product.name).length > 0) {//if do metody
            //z temporaryW przelej do internalW
            for (let [key, value] of this.internalWallet.repository) {
                this.internalWallet.repository.set(key, value.concat(this.temporaryWallet.repository.get(key)));
            }
            this.temporaryWallet.resetWallet();

            //odejmij produkt z inventory (do osobnej metody prywatnej)
            let temporaryArr = this.productsInventory.repository.get(product.name);
            temporaryArr.pop();
            this.productsInventory.repository.set(product.name, temporaryArr);
            console.log(this.productsInventory.repository.get(product.name).length)//pomocniczy

            view.print(`You receive ${product.name}`);

            //TODOzwroc reszte w postaci np listy konkretnych coinow wypisanych/ algorytm wydawania 
            if (this.saldo > product.price) {
                let amountToReturn = Math.round((this.saldo - product.price) * 100) / 100;
                view.print('Returned coins:');
                //mozliwe opcje do wydania , info z internalW

                //przelec po dostepnych monetach
                // 1 jesli laczna wartosc monet jest mniejsza od reszty? to problem - wyplac wszytsko - przypadek kiedy mamy EXACT i malo monet
                // 2 (jesli reszta % wartosc monety = 0 && (reszta / wartosc monety <= danej monety w wallecie)) to wyplac tyle razy
                // 3 jesli wartosc monety =(< od reszty to wyplac i zmiejsz saldo) reszcie /wyplac(print)/usun monete z portela
                        //saldo = 0 ? return : idz dalej
                //
                if (this.internalWallet.walletValue() < amountToReturn) {
                    //jednak niemozliwe bo zawsze bedzie mial w sobie cene + 0 lub cokolwiek?
                    //wyplacamy wszytsko i return/koniec ifa i komunikat ze sory ale bylo mowione
                }
                else if (this.internalWallet.walletValue() === amountToReturn) {
                    //jednak niemozliwe bo zawsze bedzie mial w sobie cene + 0 lub cokolwiek?
                    //wyplac wszystko i return/koniec ifa
                }

                const coinValue = key => {
                    return this.internalWallet.repository.get(key)[0].value;
                };
                const specificCoinTypeArrLength = key => {
                    return this.internalWallet.repository.get(key).length;
                };
                // while (amountToReturn > 0) {
                    for (let key of this.internalWallet.repository.keys()) {//TODO puujsc od tylu
                        console.log(key)//pomocniczy
    
                        if (specificCoinTypeArrLength(key) === 0) { console.log('pominiete');continue };
    
                        //jesli reszta % wartosc i 
                        console.log(((amountToReturn * 100) % (coinValue(key) * 100)) === 0)//poomcnicze
                        console.log(amountToReturn * 100)
                        // console.log()
                        if (((amountToReturn * 100) % ((Math.round(coinValue(key) * 100) / 100) * 100)) === 0) {//&& (amountToReturn / coinValue(key) <= specificCoinTypeArrLength(key))) {//tu ewwntualnie jesli mniej to wyplacic ile jest dostepnych, aktualzowac saldo i dalej
                            const neededCoins = amountToReturn / coinValue(key);
                            const ownedCoins = specificCoinTypeArrLength(key);
                            if (neededCoins <= ownedCoins) {
                                console.log('if needed')//pomocniczy
                                //wyplac tyle razy ile needed /uzyc withdrawCoins
                                console.log(neededCoins)
                                for (let i = 0; i < neededCoins; i++) {
                                    console.log('petla if needed')//pomocniczy
                                    this.withdrawCoin(this.internalWallet.repository, key);
                                }
                                amountToReturn = 0;
                                break;
                            } else {
                                //wyplac ownedCoins razy
                                for (let i = 0; i < ownedCoins; i++) {
                                    this.withdrawCoin(this.internalWallet.repository, key);
                                    console.log('w elsie')
                                }
                                amountToReturn -= coinValue(key);
                            }
                        }
                        if (coinValue(key) <= amountToReturn) {
                            //usun monete z portela/print
                            this.withdrawCoin(this.internalWallet.repository, key);
                            amountToReturn -= coinValue(key);
                            //amounToRet = 0 ? return : idz dalej
                        }
                    }
                    console.log(this.internalWallet.repository)
                // }
            }
            this.saldo = 0;
        } else {
            this.saldo >= product.price ? 
            view.print('Sorry, this product is SOLD OUT, choose another or get your funds back.') :
            view.print('Insufficient funds, INSERT COIN');
            console.log(this.internalWallet.repository)//pomocniczy
        }
    }

    withdrawCoin(repository, coinName) {
        let temporaryArr = repository.get(coinName);
        view.print(temporaryArr.pop().toString());
        repository.set(coinName, temporaryArr);
    }

    returnCoinsToUser() {
        // let coinsToReturn;
        // for (let value of this.temporaryWallet.repository.values()) {
        //     //wyswietl wszystkie coiny ze wszystkich kluczy
        // }
        // zrobic metoda ktora usuwa danego coina i zwraca go i przeiterowac// imitacja wydawania przez maszyne
        view.print('Returned coins:');
        // console.log(this.temporaryWallet.repository); //pomocniczy
        // this.temporaryWallet.repository.forEach(//zawsze nazwe z ostatniego bierze
        //     (value) => {
        //         view.print(`${value.toString()}`);
        //     }
        // );
        for (let key of this.temporaryWallet.repository.keys()) {
            if (this.temporaryWallet.repository.get(key).length === 0) { continue }

            let arrLength = this.temporaryWallet.repository.get(key).length;
            for (let i = 0; i < arrLength; i++) {
                // console.log(this.temporaryWallet.repository.get(key).length)//pomocniczy
                this.withdrawCoin(this.temporaryWallet.repository, key);
            }
        }
        this.saldo = 0;
        // console.log(this.temporaryWallet.repository)//pomocniczy
        // this.temporaryWallet.resetWallet();
    }

    checkCoin_SetItsValue_AddToWallet(insertedCoin) {
        for (let i = 0; i < possibleCoins.length; i++) {
            //sprawdz wage i srednice wrzuconej monety i na tej podstawie ocen monete / // if do osobnej metody
            if (insertedCoin.mass === possibleCoins[i].mass && insertedCoin.diameter === possibleCoins[i].diameter) {
                console.log(insertedCoin.value)//pomocniczy
                this.saldo += Math.round(insertedCoin.value * 100) / 100;

                //dodaj do temporaryWallet (wyniesc do osobnej m)
                let temporaryArr = this.temporaryWallet.repository.get(insertedCoin.name);
                temporaryArr.push(insertedCoin);
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
//na poczatku jak malo monet w srodku

module.exports = Controller;

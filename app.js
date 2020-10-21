const Penny = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/models/coins/penny');
const Controller = require('/home/pietia/CodeCool/advance/tw1/vendingMachine/controller/controller');


// const penny = new Penny();
// console.log(penny.diameter, penny.mass);

const controller = new Controller();
controller.start();

//dodaj metode dodajaca produkty i monety
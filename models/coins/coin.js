class Coin {
    constructor(name, value, diameter, mass) {
        this.name = name;
        this.value = value;
        this.diameter = diameter;
        this.mass = mass;
        Coin.prototype.toString = () => {
            return this.name;
        }
    }

    // coinToString() {
    //     Coin.prototype.toString = () => {
    //         return this.name;
    //     }
    // }

    // get diameter() {
    //     return this.diameter;
    // }

    // get mass() {
    //     return this.mass;
    // }

    // dlaczego takie getery nie dzialaja Cannot set property diameter of #<Coin> which has only a getter ? 
}

module.exports = Coin;
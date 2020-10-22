class Coin {
    constructor(name, value, diameter, mass) {
        this.name = name;
        this.value = value;
        this.diameter = diameter;
        this.mass = mass;
        Coin.prototype.toString = () => {
            return `${this.name} - $${this.value}`;
        }
    }
}

module.exports = Coin;
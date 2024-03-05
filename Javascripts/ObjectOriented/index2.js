class Calculator {
    // Member1
    number1;
    number2;
    number3;
    hasil;
    maksimal;

    // Member2
    constructor(numberValue1, numberValue2, numberValue3) {
        this.number1 = numberValue1;
        this.number2 = numberValue2;
        this.number3 = numberValue3;
    }

    // Member3
    getHasil() { //getter
        return this.hasil;
    }

    pertambahan() { // setter
        this.hasil = this.number1 + this.number2;
    }

    minimal() {

        if (this.number1 < this.number2) {
            return this.number1;
        }
        else if (this.number2 < this.number1) {
            return this.number2;
        }
        else if (this.number1 == this.number2) {
            return this.number1;
        }
    }

    maximal() {
        //setter
        this.maksimal = this.number1;

        if (this.number2 > this.maksimal) {
            // setter
            this.maksimal = this.number2;
        }
        if (this.number3 > this.maksimal) {
            // setter
            this.maksimal = this.number3;
        }

        // getter

        return this.maksimal;
    }
}

const kalkulasi = new Calculator(2, 4, 7);
kalkulasi.pertambahan();
const hasil = kalkulasi.getHasil();
console.log(hasil);

const max = kalkulasi.maximal();
console.log(max);
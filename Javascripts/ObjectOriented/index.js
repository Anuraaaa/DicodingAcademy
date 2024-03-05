class Animal {
    // Member1
    // Variable
    name;
    type;

    // Member2
    // Constructor
    constructor(nameValue, typeValue) {
        this.name = nameValue; // member1 variable name ngeset valuenya adalah name inheritance
        this.type = typeValue;
    }

    // Member3
    // Function
    getName() {
        return this.name; // akses member1 variable name
    }

    getType() {
        return this.type; //akses member1 variable type
    }

    setName(nameValue) {
        this.name = nameValue;
    }

    addName(nameValue) {
        this.name = this.name+nameValue;
    }
}

// Inheritance
const hewan = new Animal("Gagak", "Burung");

// 1
const dataNama = hewan.getName(); // ada nilai nama karena mereturn sebuah nama
console.log(dataNama); 

// 1
hewan.setName("Jerapah");
const dataName2 = hewan.getName();
console.log(dataName2); 


hewan.name = "Kadal";
const namaBaru = hewan.name;
console.log(namaBaru)
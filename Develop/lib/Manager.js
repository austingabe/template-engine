const Employee = require("./Employee"); // Imports Employee class

//Class Manager inherits from Employee
class Manager extends Employee {
    constructor(name, id, email, officeNumber) { // Added officeNumber property
        super(name, id, email); // Constructing from Employee
        this.officeNumber = officeNumber; // Setting officeNumber
    }

    getOfficeNumber() { // Returns office number
        return this.officeNumber;
    }

    getRole() { // Returns role
        return "Manager";
    }
}

// Exports Manager class to be imported
module.exports = Manager;
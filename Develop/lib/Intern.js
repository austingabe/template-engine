const Employee = require("./Employee"); // Imports Employee class

// Class Intern inherits from Employee
class Intern extends Employee {
    constructor(name, id, email, school) { // Added school property
        super(name, id, email); // Constructing from Employee
        this.school = school; // Setting school
    }

    getSchool() { // Returns school name
        return this.school;
    }

    getRole() { // Returns role
        return "Intern";
    }
}

// Exports Intern class to be imported
module.exports = Intern;
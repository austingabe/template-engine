// Class to get base info for employees
class Employee {
    constructor(name, id, email) {
        this.name = name; // Setting name
        this.id = id; // Setting id
        this.email = email; // Setting email
    }

    getName() { // Returns name
        return this.name;
    }

    getId() { // Returns ID
        return this.id;
    }

    getEmail() { // Returns e-maill address
        return this.email;
    }

    getRole() { // Returns role
        return "Employee";
    }
}

// Exports Employee class to be inherited
module.exports = Employee;
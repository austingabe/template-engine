const Employee = require("./Employee"); // Imports Employee class

//Class Engineer inherits from Employee
class Engineer extends Employee {
    constructor(name, id, email, github) { // Added github property
        super(name, id, email); // Constructing from Employee
        this.github = github; //Setting github
    }

    getGithub() { // Returns GitHub username
        return this.github;
    }

    getRole() { // Returns role
        return "Engineer";
    }
}

// Exports Engineer class to be imported
module.exports = Engineer;
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//  const renderContent = render(data);


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter Employee Name",
        validate: function (name) {
            // If line is left blank, it will not proceed to the next question
            return name !== "";
        }
    },

    {
        type: "input",
        name: "id",
        message: "Enter ID",
        validate: function (id) {
            return id !== "";
        }
    },

    {
        type: "input",
        name: "email",
        message: "Enter E-mail Address",
        validate: function (email) {
            return email !== "";
        }
    },

    {
        type: "list",
        name: "role",
        message: "Select Employee Role",
        choices: ["Manager", "Engineer", "Intern"]
    }
];

const managerQuestions = [
    {
        type: "input",
        name: "office",
        message: "Enter Office Number",
        validate: function (office) {
            return office !== "";
        }
    }
];

const engineerQuestions = [
    {
        type: "input",
        name: "github",
        message: "Enter GitHub Username",
        validate: function (github) {
            return github !== "";
        }
    }
];

const internQuestions = [
    {
        type: "input",
        name: "school",
        message: "Enter School Name",
        validate: function (school) {
            return school !== "";
        }
    }
];

const addTeam = [
    {
        type: "confirm",
        name: "team",
        message: "Add Another Team Member?",
        default: true
    }
];


const askEmployee = () => {
    inquirer.prompt(employeeQuestions).then(function(response){
        console.log(response);
        if (response.role === "Manager") {
            askManager();
        } else if (response.role === "Engineer") {
            askEngineer();
        } else if (response.role === "Intern") {
            askIntern();
        }
    })
}

const askManager = () => {
    inquirer.prompt(managerQuestions).then(function(response){
        console.log(response);
        askTeam();
    })
}

const askEngineer = () => {
    inquirer.prompt(engineerQuestions).then(function(response){
        console.log(response);
        askTeam();
    })
}

const askIntern = () => {
    inquirer.prompt(internQuestions).then(function(response){
        console.log(response);
        askTeam();
    })
}

const askTeam = () => {
    inquirer.prompt(addTeam).then(function(response){
        if (response.team === true) {
            askEmployee();
        } else {
            console.log("Your Team Is Complete")
        }
    })
}

askEmployee();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

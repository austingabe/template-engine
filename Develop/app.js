const Manager = require("./lib/Manager"); // Loads Manager module
const Engineer = require("./lib/Engineer"); // Loads Engineer module
const Intern = require("./lib/Intern"); // Loads Intern module
const inquirer = require("inquirer"); // Loads inquirer module
const path = require("path"); // Loads path module
const fs = require("fs"); //Loads fs module

const OUTPUT_DIR = path.resolve(__dirname, "output"); // Resolves path to output
const outputPath = path.join(OUTPUT_DIR, "team.html"); // Joins OUTPUT_DIR with team.html

const render = require("./lib/htmlRenderer"); // Loads render module

const team = []; // Empty array to be filled with employee objects

// Inquirer questions for employee base info
const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter Employee Name",
        validate: function (name) {
            return name !== ""; // If line is left blank, it will not proceed to the next question
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
        choices: ["Manager", "Engineer", "Intern"] // Based on chosen role, different follow-up questions
    }
];

// Inquirer questions for manager
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

// Inquirer questions for engineer
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

// Inquirer questions for intern
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

// Inquirer question asked after every employee to add another employee or not
const addTeam = [
    {
        type: "confirm",
        name: "team",
        message: "Add Another Team Member?",
        default: true
    }
];

// Starts off the application with employee base questions 
const createTeam = () => {
    inquirer.prompt(employeeQuestions).then(function(response) { // Asks employee base questions
        const name = response.name; // Variables are set to pass through for constructor
        const id = response.id;
        const email = response.email;
        const role = response.role;
        if (role === "Manager") { // If manager is chosen as role
            inquirer.prompt(managerQuestions).then(function(response) { // Manager questions are asked
                const officeNumber = response.office; // Variable set to pass through for constructor
                const manager = new Manager(name, id, email, officeNumber); // Manager object is created
                team.push(manager); // Manager object is pushed to team array
                askTeam(); // Asks user to add another employee or not
            })
        } else if (role === "Engineer") { // If engineer is chosen as role
            inquirer.prompt(engineerQuestions).then(function(response) { // Engineer questions are asked
                const github = response.github; // Variable set to pass through for constructor
                const engineer = new Engineer(name, id, email, github); // Engineer object is created
                team.push(engineer); // Engineer object is pushed to team array
                askTeam(); // Asks user to add another employee or not
            })
        } else if (role === "Intern") { // If intern is chosen as role
            inquirer.prompt(internQuestions).then(function(response) { // Intern questions are asked
                const school = response.school; // Variable set to pass through for constructor
                const intern = new Intern(name, id, email, school); // Intern object is created
                team.push(intern); // Intern object is pushed to team array
                askTeam(); // Asks user to add another employee or not
            })
        }
    })
}

// Asks whether or not to add another team member
const askTeam = () => {
    inquirer.prompt(addTeam).then(function(response) {
        if (response.team === true) { // If yes, calls function that asks questions for a new employee
            createTeam();
        } else if (response.team === false) { // If no, the file-making process begins
            const employees = render(team); // Variable rendering a file with employee objects found in the team array
            fs.mkdir(OUTPUT_DIR, err => { // Creating output directory
                if (err) { // If output directory already exists, move on to creating the file
                    createHtml(employees);
                } else { // If ouput directory does not exists, create it and let user know. Then create file
                    console.log("New Directory 'Output' Created");
                    createHtml(employees);
                }
            })
        }
    })
}

// Generates HTML file with employee info
const createHtml = employees => {
    fs.writeFile(outputPath, employees, err => { // Writes HTML file team.html to output directory
        if (err) { // Throw error if error
            console.log("Error - File was not created");
        } else { // If successful, let user know
            console.log("File Saved in 'Output' Directory");
        }
    })
}

// Calls createTeam() to start the application
createTeam();
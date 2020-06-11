const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

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

const askTeam = () => {
    inquirer.prompt(addTeam).then(function(response) {
        if (response.team === true) {
            createTeam();
        } else if (response.team === false) {
            const employees = render(team);
            fs.mkdir(OUTPUT_DIR, err => {
                if (err) {
                    createHtml(employees);
                } else {
                    console.log("New Directory 'Output' Created");
                    createHtml(employees);
                }
            })
        }
    })
}

const createTeam = () => {
    inquirer.prompt(employeeQuestions).then(function(response) {
        const name = response.name;
        const id = response.id;
        const email = response.email;
        const role = response.role;
        if (role === "Manager") {
            inquirer.prompt(managerQuestions).then(function(response) {
                const officeNumber = response.office;
                const manager = new Manager(name, id, email, officeNumber);
                team.push(manager);
                askTeam();
            })
        } else if (role === "Engineer") {
            inquirer.prompt(engineerQuestions).then(function(response) {
                const github = response.github;
                const engineer = new Engineer(name, id, email, github);
                team.push(engineer);
                askTeam();
            })
        } else if (role === "Intern") {
            inquirer.prompt(internQuestions).then(function(response) {
                const school = response.school;
                const intern = new Intern(name, id, email, school);
                team.push(intern);
                askTeam();
            })
        }
    })
}

const createHtml = employees => {
    fs.writeFile(outputPath, employees, err => {
        if (err) {
            console.log("Error - File was not created");
        } else {
            console.log("File Saved in 'Output' Directory");
        }
    })
}

createTeam();
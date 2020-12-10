const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

const employeeBatch = [];

const managerPrompt = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `managerName`,
            message: `Please enter the Mananger's name:`,
        },
        {
            type: `input`,
            name: `managerId`,
            message: `Please enter the Mananger's ID:`,
        },
        {
            type: `input`,
            name: `managerEmail`,
            message: `Please enter the Mananger's email:`,
        },
        {
            type: `input`,
            name: `managerOffNum`,
            message: `Please enter the Mananger's office number:`,
        },
        {
            type: `list`,
            name: `addNew`,
            message: `Would you like no add a new employee?`,
            choices: ["Engineer", "Intern", "I'm done."],
        }
    ])
    .then(answers => {
        const managerGen = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffNum);
        employeeBatch.push(managerGen);
        newEmpLogic(answers.addNew);
    });
};

const newEmpLogic = (answers) => {
    if (answers.addNew == "Engineer") {
        console.log("Adding Engineer");
    } else if (answers.addNew == "Intern") {
        console.log("Adding Intern");
    } else {
        console.log("You're done!");
    };
};

managerPrompt();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// This finds our directory labelled "output" and creates team.html when called.
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Our global and empty array of employees for the page.
const employeeBatch = [];

// This inquirer prompt chain runs when the app is loaded since managers are required and are singular.
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
            message: `Would you like to add another employee?`,
            choices: ["Engineer", "Intern", "I'm done."],
        }
    ])
    .then(answers => {
        // This will create a new object with all the entered data.
        const managerGen = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffNum);
        // The object is then pushed into the employee batch array.
        employeeBatch.push(managerGen);
        // The user is then asked if they want to add another employee.
        newEmpLogic(answers.addNew);
    });
};

// This inquirer prompt chain is ran when the user wants to add an Engineer.
const engineerPrompt = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `engineerName`,
            message: `Please enter the Engineer's name:`,
        },
        {
            type: `input`,
            name: `engineerId`,
            message: `Please enter the Engineer's ID:`,
        },
        {
            type: `input`,
            name: `engineerEmail`,
            message: `Please enter the Engineer's email:`,
        },
        {
            type: `input`,
            name: `engGitHub`,
            message: `Please enter the Engineer's GitHub username:`,
        },
        {
            type: `list`,
            name: `addNew`,
            message: `Would you like to add another employee?`,
            choices: ["Engineer", "Intern", "I'm done."],
        }
    ])
    .then(answers => {
        // This will create a new object with all the entered data.
        const engineerGen = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engGitHub);
        // The object is then pushed into the employee batch array.
        employeeBatch.push(engineerGen);
        // The user is then asked if they want to add another employee.
        newEmpLogic(answers.addNew);
    });
};

const internPrompt = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `internName`,
            message: `Please enter the Intern's name:`,
        },
        {
            type: `input`,
            name: `internId`,
            message: `Please enter the Intern's ID:`,
        },
        {
            type: `input`,
            name: `internEmail`,
            message: `Please enter the Intern's email:`,
        },
        {
            type: `input`,
            name: `internSchool`,
            message: `Please enter the Intern's school:`,
        },
        {
            type: `list`,
            name: `addNew`,
            message: `Would you like to add another employee?`,
            choices: ["Engineer", "Intern", "I'm done."],
        }
    ])
    .then(answers => {
        // This will create a new object with all the entered data.
        const internGen = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        // The object is then pushed into the employee batch array.
        employeeBatch.push(internGen);
        // The user is then asked if they want to add another employee.
        newEmpLogic(answers.addNew);
    });
};

// This runs when the user selects in a prompt that they want to add another employee.
const newEmpLogic = (answers) => {
    // If they chose to add an Engineer...
    if (answers == "Engineer") {
        // Run the Engineer inquirer prompts.
        engineerPrompt();
    // If they chose to add an Intern...
    } else if (answers == "Intern") {
        // Run the Intern inquirer prompts.
        internPrompt();
    } else {
        // Otherwise, this is our sole end point.
        console.log("You're done!");
        // We create the team.html using all of the employee objects in the employeeBatch array.
        fs.writeFile(outputPath, render(employeeBatch), (err) => {
            if (err) throw err;
            console.log("File Written.");
        })
    };
};

// Start point.
managerPrompt();
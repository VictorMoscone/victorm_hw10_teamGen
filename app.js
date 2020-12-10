const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

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
            message: `Would you like to add another employee?`,
            choices: ["Engineer", "Intern", "I'm done."],
        }
    ])
    .then(answers => {
        const managerGen = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffNum);
        employeeBatch.push(managerGen);
        newEmpLogic(answers.addNew);
    });
};

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
        const engineerGen = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engGitHub);
        employeeBatch.push(engineerGen);
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
        const internGen = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        employeeBatch.push(internGen);
        newEmpLogic(answers.addNew);
    });
};

const newEmpLogic = (answers) => {
    if (answers == "Engineer") {
        engineerPrompt();
    } else if (answers == "Intern") {
        internPrompt();
    } else {
        console.log("You're done!");
        fs.writeFile(outputPath, render(employeeBatch), (err) => {
            if (err) throw err;
            console.log("File Written.");
        })
    };
};

managerPrompt();
#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 10000;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(chalk.bold.yellow(`Balance for $ ${this.name} ${this.balance}`));
    }
    pay_fee(amount) {
        this.balance -= amount;
        console.log(chalk.bold.green(` $ ${amount} Fees paid successfully for  ${this.name}`));
        console.log(chalk.bold.blue(` Remaining Balance : $ ${this.balance}`));
    }
    show_status() {
        console.log(chalk.bold.red(`Student ID: ${this.id}`));
        console.log(chalk.bold.red(`Name: ${this.name}`));
        console.log(chalk.bold.red(`Courses: ${this.courses.join(", ")}`));
        console.log(chalk.bold.red(`Balance: $ ${this.balance}`));
    }
}
class Student_Manager {
    students = [];
    constructor() {
        this.students = [];
    }
    add_student(name) {
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(chalk.bold.yellow(`New Student added: ${name} successfully ! New Student ID: ${newStudent.id}`));
    }
    enroll_student(student_id, course) {
        let newStudent = this.find_student(student_id);
        if (newStudent) {
            newStudent.enroll_course(course);
            console.log(chalk.bold.yellow(`* ${newStudent.name} Course ${course} enrolled successfully for Student ID: ${student_id}`));
        }
    }
    view_student_balance(student_id) {
        let newStudent = this.find_student(student_id);
        if (newStudent) {
            newStudent.view_balance();
        }
        else {
            console.log(chalk.bold.red(`No Student Found .Please Enter a Correct Student ID: ${student_id}`));
        }
    }
    pay_student_fee(student_id, amount) {
        let newStudent = this.find_student(student_id);
        if (newStudent) {
            newStudent.pay_fee(amount);
        }
        else {
            console.log(chalk.bold.red(`No Student Found .Please Enter a Correct Student ID: ${student_id}`));
        }
    }
    show_student_status(student_id) {
        let newStudent = this.find_student(student_id);
        if (newStudent) {
            newStudent.show_status();
        }
        else {
            console.log(chalk.bold.red(`No Student Found .Please Enter a Correct Student ID: ${student_id}`));
        }
    }
    find_student(student_id) {
        return this.students.find((student) => student.id === student_id);
    }
}
async function main() {
    console.log(chalk.bold.italic.bgGreenBright("\n\t Welcome to the 'CODEWITHHONEY' Student Management System "));
    console.log(chalk.bold.yellow("=".repeat(70)));
    let student_manager = new Student_Manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "Choose an Option :",
                choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fee", "Show Student Status", "Exit"]
            }
        ]);
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "Enter Student Name:"
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID:"
                    },
                    {
                        type: "input",
                        name: "course",
                        message: "Enter Course Name:"
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID:"
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fee":
                let fee_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID:"
                    },
                    {
                        type: "number",
                        name: "amount",
                        message: "Enter Amount to Pay:"
                    }
                ]);
                student_manager.pay_student_fee(fee_input.student_id, fee_input.amount);
                break;
            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: "Enter Student ID:"
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.bold.blue("Exiting the Student Management System..."));
                process.exit();
                break;
            default:
        }
    }
}
//calling a main function
main();

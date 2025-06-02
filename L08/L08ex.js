//Template String example
const myName = "John";
const myAge = 30;
// Using template literals with ${} syntax
const message = `Hello, my name is ${myName} and I am ${myAge} years old.`;
console.log(message);

//Arrow function example
const triple = (num) => {
    return num*3;
}
console.log("Answer: " + triple(2));
//or
const triple1 = num => num*3;
console.log("Änswer: " + triple(2));

//Spread Operator
const fruits = ["apricot", "orange"];
const vegetables = ["cucumber", "potato"];
const new_array = [fruits, vegetables]
console.log(new_array);

//Javascript class Example
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    makeSound() {
        console.log("Some generic animal sound");
    }
    getDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Species: ${this.species}`);
    }
}

const animal = new Animal(`Polly`, `cat`);
animal.makeSound();
animal.getDetails();

//Javascript class Try it, Classes
class Book {
    constructor (title, author, publicationYear){
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
    }
    getDetails(){
        console.log(`Title: ${this.title}`)
        console.log(`Author: ${this.author}`)
        console.log(`Publication Year: ${this.publicationYear}`)
    }
}

const myBook = new Book("Intro to Javascript", "R.M. Salinzer", 2023);
myBook.getDetails();

//Inhertience Try it, Classes
class Book2 {
    constructor(title, author, publicationYear){
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
    }
    getDetails(){
        console.log(`Title: ${this.title}`)
        console.log(`Author: ${this.author}`)
        console.log(`Publication Year: ${this.publicationYear}`)
    }
}
//Inheritence
class Magazine extends Book2 {
    constructor(title, author, publicationYear, issueNumber) {
        super(title, author, publicationYear);
        this.issueNumber = issueNumber;
    }

    getDetails(){
        super.getDetails();
        console.log(`Issue Number: ${this.issueNumber}`)
    }
}

const myBook2 = new Book2("Intro to JavaScript", "R.M, Salinzer", 2023);
myBook.getDetails();

const myMagazine = new Magazine("National Geographic", "Various", 2022, 123);
myMagazine.getDetails();
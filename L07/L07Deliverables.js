//Section A
//Q1
let firstName = "Ruth";
let lastName = "Ho";
console.log("Welcome, " + firstName + " " + lastName + "!");

//Q2
function getAgeInMonths(ageInYears)
 {
    return ageInYears * 12;
  }

  let age = 18;
  let months = getAgeInMonths(age);
  console.log(age + " years is " + months + " months");

//Section B
//Q3
const favSubjects = ["Literature","English", "History"];
for (let i = 0; i < favSubjects.length; i++)
    {
    console.log("I enjoy learning " + favSubjects[i]);
  }

//Q4
for (let i = 1; i <=20; i++)
    {
        if (i % 4 == 0)
        {
            console.log("Wow!");
        }
        else{
            console.log(i);
        }
    }

//Section C
//Q5
const todoList = ["Do laundry", "Finish homework", "Buy groceries"];
todoList.push("Submit assignment");
todoList.shift();
todoList.unshift("Drink water");
console.log(todoList);

//Q6
const [task1, task2, task3, task4] = todoList

console.log("First Task: " + task1);
console.log("Second Task: " + task2);


//Section D
//Q7
//JavaScript Objects\
let movie = {
    title: "Blue Velvet",
    year: 1986,
    rating: 8,
    isWatched: true
};

function printMovieDetails(movie)
{
    console.log("You watched '" + movie.title + "'" + " (" + movie.year + "), rated " + movie.rating + "/10." )
}
printMovieDetails(movie); 
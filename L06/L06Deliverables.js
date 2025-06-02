//Q1
const myArr = ["RP", 2025, true];

myArr.push("C237");

myArr.pop();

myArr.unshift("School of Infocomm");
console.log(myArr);

//Q2
const ruthArr = ["cupcakes","chips","sweets"];
console.log(ruthArr);
ruthArr.pop();
console.log(ruthArr)

//Q3
const colorsArr = ["Red","Green","Blue"];
const [Color1, Color2, Color3] = colorsArr;


console.log("Color 1: " + Color1);
console.log("Color 2: " + Color2);
console.log("Color 3: " + Color3);

//Q4
function square(num)
{
    return num * num;
}
console.log("Answer is: " + square(5))

//Q5
function greetUser(name)
{
    console.log("Hello, " + name + "! Welcome to C237.");
}
greetUser("Ruth")

//Q6
let laptop = {
    brand: "HP",
    model: "Spectre",
    year: 2023,
    touchscreen: true
  };
  
  console.log("Brand: " + laptop.brand);
  console.log("Model: " + laptop.model);
  console.log("Year: " + laptop.year);
  console.log("Touchscreen: " + laptop.touchscreen);

//Q7
laptop.color = "silver";

console.log("Color: " + laptop.color);

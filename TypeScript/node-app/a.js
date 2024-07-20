"use strict";
const x = 1;
console.log(x);
function func(firstname) {
    console.log("Hello" + firstname);
}
func("Saumayyy");
function isLegal(user) {
    if (user.age > 18) {
        console.log("Legal")
        return true;
    }
    else
        return false;
}
isLegal({
    firstname: "Saumay",
    lastname: "Aggarwal",
    age: 20
});

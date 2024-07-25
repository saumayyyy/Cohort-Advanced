"use strict";
function sumOfAges(user1, user2) {
    return user1.age + user2.age;
}
const user3 = {
    name: "Saumayy",
    age: 18,
    email: "abcdefghi",
    createdAt: new Date(Date.now())
};
console.log(user3);
//user3.name = "change";
const val = sumOfAges({ name: "Saumay", age: 18 }, { name: "Harkirat", age: 23 });
console.log(val);

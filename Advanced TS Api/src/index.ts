interface User{
    name: string;
    age: number;
    email:string;
    createdAt:Date;
}

type nameAndAge = Pick<User ,'name'|'age'>

type updatePropsOptional = Partial<nameAndAge>

function sumOfAges(user1:nameAndAge,user2:nameAndAge ){
    return user1.age+user2.age;
}

const user3:Readonly<User> = {
    name:"Saumayy",
    age :18,
    email:"abcdefghi",
    createdAt:new Date(Date.now())
}
console.log(user3);
//user3.name = "change";

const val = sumOfAges({name:"Saumay",age:18},
                    {name:"Harkirat",age:23});
console.log(val);

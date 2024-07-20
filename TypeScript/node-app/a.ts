const x :number = 1;
console.log(x);


function func(firstname:string){
    console.log("Hello" + firstname);
}

func("Saumayyy");

interface User{
    firstname:string,
    lastname:string,
    age:number
}
function isLegal(user:User){
    if(user.age>18){
        return true;
    }  
    else return false;

} 
isLegal({
    firstname:"Saumay",
    lastname:"Aggarwal",
    age:20
})
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username:string,firstName:string,lastName:string){
    const response =await prisma.user.create({
        data:{
            firstName,
            username,
            lastName,
        }
    })
    console.log(response);
}
insertUser("Saumascaayyyy","tesfast","tesscat");
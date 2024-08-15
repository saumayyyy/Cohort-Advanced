"use server"

import client from "@/db";


async function solve(username:string, password:string){
    //store in DB
    try {
        await client.user.create({
            data:{
                username: username,
                password: password,
            }
        })
    
        return true;
        
    } catch (error) {
        return false;
    }
    
}
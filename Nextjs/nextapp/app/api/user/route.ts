import { NextRequest } from "next/server";
import  client  from "@/db"

export async function POST(req : NextRequest){
    //extract body
    const body =await req.json();
    //store in DB
    await client.user.create({
        data:{
            username: body.username,
            password: body.password,
        }
    })

    return Response.json({
        msg:"User created successfully"
    })
}
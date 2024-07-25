import {z} from "zod";
import express from "express";

const app = express();

const userProfileSchema = z.object({
    name: z.string().min(1,{message:"Name cannot be empty"}),
    email: z.string().email({message:"Invalid format"}),
    age: z.number().min(18,{message:"Age should be more than 18"})
    .optional(),
});

type userSchema = z.infer<typeof userProfileSchema>;

app.put("/user",(req,res)=>{
    const {success} = userProfileSchema.safeParse(req.body);

    const updateBody:userSchema = req.body;
    // const updateBody:{
    //     name:string;
    //     age?:number;
    //     email:string;
    // } = req.body;//assign type to update body->1 way

    if(!success){
        return res.status(411).json({});
    }
    //update DB call here
    return res.status(200).json({msg:"User Updated"});
});
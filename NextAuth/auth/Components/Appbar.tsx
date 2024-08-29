"use client"
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"

export const Appbar = ()=>{
    const router = useRouter();

    return (
        <div className="flex gap-10">
            <button onClick={()=>{
            signIn();
        }}>Sign In</button>
        
        <button onClick={()=>{
            signOut();
        }}>Sign Out</button>    
        </div>
        
    )
}
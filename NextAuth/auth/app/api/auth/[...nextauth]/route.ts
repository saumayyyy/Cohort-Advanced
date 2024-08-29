import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"email", type:"text", placeholder:"email"},
                password:{label:"password", type:"text", placeholder:"password"},
            },
            async authorize(credentials : any){
                return {
                    name:"saumay",
                    id : 1,
                };
            }, 
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
});

export const GET = handler;
export const POST = handler;
import NextAuth from "next-auth";
//Double check if the above path needs to be 'next-auth/next'
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers:[
        //Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
        

    ]

    
})
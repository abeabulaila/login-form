import NextAuth from "next-auth";
//Double check if the above path needs to be 'next-auth/next'
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
    providers:[
        //Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        
        //Discord Provider
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
          })

    ]

    
})
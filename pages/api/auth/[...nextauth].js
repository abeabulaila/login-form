import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider  from 'next-auth/providers/credentials'
import connectMongo from "@/database/connection";
import Users from "@/model/schema";
import { compare } from "bcryptjs";

export default NextAuth({
    providers: [
        //Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),

        //Discord Provider
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
        }),

        //Credentials Provider
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => { error: "Connection Failed :(" })

                //Check If User Exists
                const result = await Users.findOne({ email: credentials.email })
                if (!result) {
                    throw new Error("No User Found with That Email. Please Sign Up!")
                }

                 //Check Hashed Password
                const checkPassword = await compare(credentials.password, result.password);

                //Incorrect Password
                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username or Password doesn't match");
                }

                return result;
            }
        })
    ],
    secret: "Gi5+VOOEwGzoF21MhP7Pcb/PAxYa7fEwAN2v5wyB2fA="
})

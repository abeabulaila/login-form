import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from "@/database/connection";
import Users from "@/model/schema";
import { compare } from "bcryptjs";
import Discord from "@/lib/discord";

const options = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
            scope: ['identify', 'email', 'guilds'],
        }),
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
                token.refreshToken = account.refreshToken;
            }
            return token;
        },

        async session(session, token) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;

            if (session.user.accessToken) {
                client.token = session.user.accessToken;
                await client.login();

                const user = await client.users.fetch(session.user.id);
                session.user.username = user.username;
                session.user.discriminator = user.discriminator;
                session.user.avatar = user.avatar;
            }
            return session;
        }
    }
}

export default (req, res) => NextAuth(req, res, options);
 

import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Profile from "./models/User"
import { connectToDatabase } from "./lib/mongodb"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    callbacks: {
        async signIn({ user }) {
            console.log("Google User:", user);
            const db = await connectToDatabase("Users");
            const profilesCollection = db.collection("profiles");

            const existingUser = await profilesCollection.findOne({ email: user.email });

            if (existingUser) {
                console.log("Existing user found, passing to session.");
                // Attach dbUser to the session's user object
                user.dbUser = existingUser;  // Attach dbUser (existingUser from DB)
                return true;
            }

            // If no user exists, create a new one
            const newUser = await profilesCollection.insertOne({
                email: user.email,
                phoneNumber: user.phoneNumber,
                name: user.name,
                createdAt: new Date()
            });
            return true;
        },

        async session({ session, token }) {
            // Attach dbUser to the session object
            if (token && token.dbUser) {
                session.user = token.dbUser;  // Add dbUser (with _id) to session.user
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.dbUser = user.dbUser;  // Store dbUser in token
            }
            return token;
        }
    }
})
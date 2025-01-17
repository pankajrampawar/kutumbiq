import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Profile from "./models/User"
import { connectToDatabase } from "./lib/mongodb"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    callbacks: {
        async signIn({ user }) {
            console.log(user);
            const db = await connectToDatabase("Users");
            console.log("Connected to database");
            const profilesCollection = db.collection("profiles");
            const existingUser = await profilesCollection.findOne({ email: user.email });

            if (existingUser) {
                console.log("existing user");
                const allProfiles = await profilesCollection.find().toArray();
                console.log(allProfiles);
                return true;
            }

            if (!existingUser) {
                console.log("non an existing user");
                const ProfileAded = await profilesCollection.insertOne({
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    name: user.name,
                    createdAt: new Date()
                });

                console.log("Profile added", ProfileAded);
            }
            return true;
        }
    },
})
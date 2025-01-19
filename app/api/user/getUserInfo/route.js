import { connectToDatabase } from "@/lib/mongodb";
import { db } from "@/models/User";
import { ObjectId } from "mongodb";

export const GET = async (req) => {
    try {
        const { _id } = await req.json();

        if (!_id) {
            return createResponse({ error: "User id is required!" }, 404)
        }

        const db = await connectToDatabase("Users");

        if (!db) {
            return createResponse({ error: "Unable to connect to databse, please try again later" }, 500)
        }

        const objectId = new ObjectId(_id);

        const user = await db.collection("Profiles").findOne({ _id: objectId });

        if (!user) {
            console.log("User not found.");
            return createResponse({ errro: "user not found" }, 404);
        }

        return createResponse(user, 200);
    } catch (error) {
        console.log("Error loading user data! Pleaes try again later", error);

        return createResponse({ error: "Failed to data! please try again later!" }, 500)
    }
}



function createResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}
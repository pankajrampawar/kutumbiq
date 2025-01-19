import { connectToDatabase } from "@/lib/mongodb";

export const GET = async (req) => {
    try {
        const url = new URL(req.url); // Get the request URL
        const email = url.searchParams.get("email");
        console.log(email)
        if (!email) {
            return createResponse({ error: "User id is required!" }, 404)
        }

        const db = await connectToDatabase("Users");

        if (!db) {
            return createResponse({ error: "Unable to connect to databse, please try again later" }, 500)
        }

        const user = await db.collection("profiles").findOne({ email: email });

        if (!user) {
            console.log("User not found.");
            return createResponse({ errror: "user not found" }, 404);
        }

        console.log(user)
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
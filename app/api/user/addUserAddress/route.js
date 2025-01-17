import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId, ReturnDocument } from "mongodb";

// route to check users address requires user _id and address

export const POST = async (req) => {
    try {
        const { _id, address } = await req.json();

        if (!_id && !address) {
            return new Response(
                JSON.stringify({ error: "userId and Address are required." }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            )
        }

        // connect with database
        const db = await connectToDatabase("User");

        if (!db) {
            return new Response(
                JSON.stringify({ error: "Unable to connect with databse." }),
                {
                    status: 500,
                    headers: { "Content-Type": "applcation/json" }
                }
            )
        }

        const result = await db.collection("profiles").findOneAndUpdate(
            { _id: new ObjectId(_id) },
            { $set: { address: address } },
            { ReturnDocument: "after" }
        )

        if (result) {
            return new Response(
                JSON.stringify({ message: "Updated user address" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" }
                }
            )
        } else {
            return new Response(
                JSON.stringify({ error: "update failed no document was modified" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" }
                }
            )
        }

    } catch (error) {
        console.log("Error updating the address: ", error);
        return new Response(
            JSON.stringify({ error: "Internal server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}
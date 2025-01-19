import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const POST = async (req) => {
    try {
        // Parse the request body
        const { phoneNumber, _id } = await req.json();

        // Validate input fields
        if (!_id || !phoneNumber) {
            return new Response(
                JSON.stringify({ error: "Phone Number and User ID are required" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Convert _id to ObjectId if it's a string
        const objectId = new ObjectId(_id);

        // Connect to the "Users" database
        const db = await connectToDatabase("Users");
        if (!db) {
            return new Response(
                JSON.stringify({ error: "Failed to connect to the database" }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Check if the document exists first
        const user = await db.collection("profiles").findOne({ _id: objectId });
        if (!user) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Perform the update
        const result = await db.collection("profiles").findOneAndUpdate(
            { _id: objectId }, // Match by ObjectId
            { $set: { phoneNumber: phoneNumber } }, // Update phoneNumber
            { returnDocument: "after" } // Return the updated document
        );

        // Check if the document was updated
        if (result) {
            return new Response(
                JSON.stringify({ message: "Phone Number added successfully" }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            );
        } else {
            return new Response(
                JSON.stringify({ error: "Update failed, no document was modified" }),
                {
                    status: 404,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};  
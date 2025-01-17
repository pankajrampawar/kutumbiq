import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const POST = async (req) => {
    try {
        // Parse and validate request body
        const { _id, address } = await req.json();

        // Input validation
        if (!_id || !address) {
            return new Response(
                JSON.stringify({
                    error: "Both userId and address are required fields"
                }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
            );
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(_id)) {
            return new Response(
                JSON.stringify({
                    error: "Invalid user ID format"
                }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            }
            );
        }

        // Connect to database
        const db = await connectToDatabase("Users");
        if (!db) {
            return new Response(
                JSON.stringify({
                    error: "Database connection failed"
                }), {
                status: 503,
                headers: { "Content-Type": "application/json" }
            }
            );
        }

        // Convert string ID to ObjectId
        const objectId = new ObjectId(_id);

        // First check if user exists
        const userExists = await db.collection("profiles").findOne({ _id: objectId });

        if (!userExists) {
            return new Response(
                JSON.stringify({
                    error: "User not found"
                }), {
                status: 404,
                headers: { "Content-Type": "application/json" }
            }
            );
        }

        // Update user address
        const result = await db.collection("profiles").updateOne(
            { _id: objectId },
            {
                $set: {
                    address,
                    updatedAt: new Date()
                }
            }
        );

        // Check if update was successful
        if (result.modifiedCount === 0) {
            return new Response(
                JSON.stringify({
                    error: "Failed to update address"
                }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
            );
        }

        // Return success response
        return new Response(
            JSON.stringify({
                message: "Address updated successfully",
                address: address
            }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        }
        );

    } catch (error) {
        // Log error for debugging but don't expose details to client
        console.error("Address update error:", error);

        return new Response(
            JSON.stringify({
                error: "An error occurred while updating the address"
            }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        }
        );
    }
};
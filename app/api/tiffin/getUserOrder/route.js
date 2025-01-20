import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";

export async function POST(req) {
    try {
        // Parse the request body
        const { userId } = await req.json();

        // Validate the userId
        if (!userId) {
            return createResponse({ error: "User Id is required" }, 400);
        }

        // Connect to the database
        const db = await connectToDatabase("Tiffin");
        if (!db) {
            return createResponse({ error: "Database connection failed" }, 503);
        }

        // Fetch the user's orders
        const orders = await db.collection("orders").find({ userId }).toArray();
        if (!orders) {
            return createResponse({ error: "No orders found for this user" }, 404);
        }

        // Return the orders
        return createResponse(orders, 200);
    } catch (error) {
        console.error("Failed to fetch user orders:", error);
        return createResponse({ error: "Internal Server Error" }, 500);
    }
}

// Utility function for creating responses
function createResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}
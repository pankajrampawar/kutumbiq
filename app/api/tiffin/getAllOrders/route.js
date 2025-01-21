import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
    try {
        const db1 = await connectToDatabase("Tiffin");
        const db2 = await connectToDatabase("Users");

        // Fetch all orders
        const orders = await db1.collection('orders').find({}).toArray();

        // Fetch all users
        const users = await db2.collection('profiles').find({}).toArray();

        // Create a map of users by their IDs for efficient lookup
        const userMap = users.reduce((acc, user) => {
            acc[user._id.toString()] = user;
            return acc;
        }, {});

        // Enrich orders with user details
        const enrichedOrders = orders.map((order) => ({
            ...order,
            user: userMap[order.userId] || null, // Use userMap for quick access
        }));

        return new Response(JSON.stringify({ data: enrichedOrders }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching orders with user info:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch orders with user info" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
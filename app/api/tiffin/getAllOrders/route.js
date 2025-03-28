import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const dateParam = url.searchParams.get('date');

        let query = {};
        if (dateParam) {
            const start = new Date(dateParam);
            start.setUTCHours(0, 0, 0, 0);
            const end = new Date(start);
            end.setUTCDate(end.getDate() + 1);
            query = {
                createdAt: {
                    $gte: start,
                    $lt: end,
                },
            };
        }

        const db1 = await connectToDatabase("Tiffin");
        const db2 = await connectToDatabase("Users");

        // Fetch orders based on the query
        const orders = await db1.collection('orders').find(query).toArray();

        // Optimize: Fetch only users related to these orders
        const userIds = [...new Set(orders.map(order => order.userId))];
        const objectIds = userIds.map(id => new ObjectId(id));
        const users = await db2.collection('profiles').find({ _id: { $in: objectIds } }).toArray();

        // Create a user map for efficient lookup
        const userMap = users.reduce((acc, user) => {
            acc[user._id.toString()] = user;
            return acc;
        }, {});

        // Enrich orders with user details
        const enrichedOrders = orders.map((order) => ({
            ...order,
            user: userMap[order.userId] || null,
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
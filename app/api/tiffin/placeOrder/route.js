import { connectToDatabase } from "@/lib/mongodb";

export const POST = async (req) => {
    try {
        const { userId, vendorId, totalPrice, items } = await req.json();

        if (!userId || !vendorId || !totalPrice || !items) {
            return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
        }

        const db = await connectToDatabase("Tiffin")

        if (db) {
            console.log("connected to databse");
        };
        if (!db) {
            console.log("not connected")
            return new Response(
                JSON.stringify({
                    error: "Database connection failed"
                }), {
                status: 503,
                headers: { "Content-Type": "application/json" }
            }
            );
        }

        const newOrder = db.collection("orders").insertOne({
            userId,
            vendorId,
            totalPrice,
            items,
            status: "pending",
            createdAt: new Date()
        })

        if (newOrder) {
            return new Response(
                JSON.stringify({ message: "Order Placed Successfully" }),
                {
                    status: 200,
                    headers: { "Content-Type": "Application/json" }
                }
            );
        }
    } catch (error) {
        console.log("Error placing the order", error);

        return new Response(
            JSON.stringify({ error: "Unabel to place order please try again later." }),
            {
                status: 500,
                headers: { "Content-Type": "Application/json" }
            }
        )
    }
}
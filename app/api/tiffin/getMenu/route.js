import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {

    try {
        const db = await connectToDatabase("Tiffin");

        // Fetch menu items
        const menu = await db.collection("vendor").find({}).toArray();

        // Return 404 if menu is empty or null
        if (!menu?.length) {
            return createResponse({ error: "No menu items found" }, 404);
        }

        // Return the fetched menu
        return createResponse(menu, 200);
    } catch (error) {
        console.error("Failed to fetch menu:", error);
        return createResponse({ error: "Failed to fetch menu" }, 500);
    }
}

function createResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}
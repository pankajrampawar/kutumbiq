import { connectToDatabase } from "@/lib/mongodb";

export default async function GET() {
    try {
        const db = await connectToDatabase("Tiffin")

        const vendors = await db.colllection("vendors").find({}).toArray();

        if (!vendors) {
            return createResponse({ error: "unable to fetch vendors" }, 404)
        }

        return createResponse(vendors, 200)
    } catch (error) {
        console.log(error)
        return createResponse({ error: "Internal server Error" }, 500)
    }
}

function createResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" }
    });
}
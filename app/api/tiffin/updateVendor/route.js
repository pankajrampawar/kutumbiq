import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const vendor = await req.json();
        console.log(vendor)
        if (!vendor.name || !vendor.menu || vendor.menu.length === 0) {
            return NextResponse.json({ mesage: "Invalid Vendor Data" }, { status: 400 })
        }

        const db = await connectToDatabase('Tiffin')
        const collection = db.collection("orders")
        const result = await collection.insertOne(vendor);

        return NextResponse.json({ message: "Vendor added successfully", id: result.insertedId }, { status: 200 })
    } catch (error) {
        console.error("Error adding vendor:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}


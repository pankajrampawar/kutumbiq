import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const POST = async (req) => {
    try {
        const vendor = await req.json();
        console.log(vendor)
        if (!vendor.name || !vendor.menu || vendor.menu.length === 0) {
            return NextResponse.json({ mesage: "Invalid Vendor Data" }, { status: 400 })
        }

        const db = await connectToDatabase('Tiffin')
        const collection = db.collection("vendors")
        const result = await collection.insertOne(vendor);

        return NextResponse.json({ message: "Vendor added successfully", id: result.insertedId }, { status: 200 })
    } catch (error) {
        console.error("Error adding vendor:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export const PUT = async (req) => {
    try {
        const { id, ...updatedData } = await req.json(); // Extract id and the rest of the data
        console.log("Updating vendor with ID:", id, "Data:", updatedData);
        delete updatedData._id;
        if (!id) {
            return NextResponse.json({ message: "Vendor ID is required" }, { status: 400 });
        }

        const db = await connectToDatabase('Tiffin');
        const collection = db.collection("vendors");

        // Update the vendor document
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Filter by vendor ID
            { $set: updatedData } // Update with the provided data
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Vendor not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Vendor updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating vendor:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
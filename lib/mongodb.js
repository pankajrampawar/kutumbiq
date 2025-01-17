import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(dbName = "Users") {
    if (cached.conn) {
        console.log(`Reusing existing connection for database: ${dbName}`);
        return cached.conn.connection.useDb(dbName);
    }

    if (!cached.promise) {
        console.log("Establishing new MongoDB connection...");
        cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
            console.log("MongoDB connected successfully!");
            return mongooseInstance;
        }).catch((err) => {
            console.error("MongoDB connection error:", err);
            throw new Error("Failed to connect to MongoDB");
        });
    }

    cached.conn = await cached.promise;

    console.log(`Switching to database: ${dbName}`);
    return cached.conn.connection.useDb(dbName);
}

export { connectToDatabase };
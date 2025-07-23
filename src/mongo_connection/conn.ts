import mongoose from "mongoose";

const DB: string = process.env.MONGO_URL || '';

const connectMongoDb = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(DB, {})
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1)
    }
}

export {
    connectMongoDb
}
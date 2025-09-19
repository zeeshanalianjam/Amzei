import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionHost = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected to", connectionHost.connection.host);
    } catch (error) {
        console.log("Error in connecting to DB",error);
        process.exit(1);
    }
}
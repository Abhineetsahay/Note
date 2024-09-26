import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const database = async ()=> {
    const databaseUrl: string | undefined = process.env.MONGODB_URL;

    if (!databaseUrl) {
        throw new Error("MONGODB_URL is not defined in the environment variables");
    }

    try {
        await mongoose.connect(databaseUrl);
        console.log("DB connected successfully");
    } catch (err) {
        console.log("DB CONNECTION ISSUES");
        console.error(err);
        process.exit(1); 
    }
};

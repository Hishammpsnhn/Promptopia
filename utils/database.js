import mongoose from "mongoose"

export const connectToDB = async () => {
    const isConnected = false;
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("DB connected already")
        return;
    } else {
        try {
            await mongoose.connect(process.env.MONGODB_URL, {
                dbName: 'share_prombt',
                useNewUrlParser: true,
                // useUnifieldTopology: true,
            });
            console.log("DB connected");
        } catch (error) {
            console.log(error);
        }
    }
}
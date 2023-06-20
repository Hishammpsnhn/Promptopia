import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req,{params}) => {
    console.log("get this router")
    try {
        await connectToDB()
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator')

        return new Response(JSON.stringify(prompts),
         { status: 200 })
    } catch (err) {
        return new Response("failed to get prompts", { status: 500 });
    }
}
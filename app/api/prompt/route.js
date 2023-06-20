import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {

    try {
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 201 })
    } catch (err) {
        return new Response("failed to get prompts", { status: 500 });
    }
}
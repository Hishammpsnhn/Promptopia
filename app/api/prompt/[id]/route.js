import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
//GET (read)

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id)
            .populate('creator')
        if (!prompt) return new Response("prompt not found",
            { status: 404 })
        return new Response(JSON.stringify(prompt),
            { status: 201 })
    } catch (err) {
        return new Response("failed to get prompts",
            { status: 500 });
    }
}

//PATCH (write)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id)
            .populate('creator')

        if (!existingPrompt) return new Response("prompt not found",
            { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 201 })
    } catch (err) {
        return new Response("failed to update prompts", { status: 500 });
    }
}

//DELETE (delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt deleted successsully", { status: 201 })
    } catch (err) {
        return new Response("failed to delete prompts", { status: 500 });
    }
}
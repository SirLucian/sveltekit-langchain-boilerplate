import type { Actions } from './$types';
import { json } from '@sveltejs/kit';
import { OpenAI } from 'langchain/llms';
import { LEO_API_KEY, OPENAI_API_KEY } from '$env/static/private';
import { Leonardo } from '@leonardo-ai/sdk';
import { CreateGenerationResponse } from '@leonardo-ai/sdk/dist/sdk/models/operations';
import {
	ControlnetTypeEnum,
	SdGenerationSchedulersEnum,
	SdGenerationStyleEnum,
	SdVersionsEnum
} from '@leonardo-ai/sdk/dist/sdk/models/shared';

export const actions = {
	generate: async ({ request }) => {
		const data = await request.formData();
		const input = data.get('keyword');
		const tone = data.get('tone');
		// Initialize the Model
		const model = new OpenAI({ temperature: 0, openAIApiKey: OPENAI_API_KEY });

		// Load and store the file
		const prompt = await model.call(
			`Act as a prompt generator for a generative AI called 'Leonardo AI'. Leonardo AI generates images based on given prompts. I will provide you basic information required. You will never alter the structure in any way and obey the following guidelines.

   **Example 1:**
   Requested environment: "orc swamp"
   Requested vibe: ["eery"]
   Your Response: "A murky, foggy swamp, the air thick with the smell of decay, and the sound of orcs lurking in the shadows."

   **Example 2:**
   Requested keywords: "pirate harbour"
   Requested vibe: ["scary"]
   Your response: "A weathered pirate harbour, with a creaky dock and a salty smell."

   **Example 3:**
   Requested keywords: "pirate harbour"
   Requested vibe: ["lively"]
   Your response: "A bustling pirate harbour, filled with colorful sails and bustling activity."

   **Example 4:**
   Requested keywords: "goblin cave"
   Requested vibe: ["mysterious","seductive"]
   Your response: "A vast and mysterious ancient goblin cave, with a hidden chamber filled with forgotten treasures and a mysterious portal leading to unknown realms."

   Now you try:
   Requested keywords: {input},
   Requested vibe: {tone_selection},
   Your response: "..."
   `
		);
		console.log(prompt);
		const postOptions = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				authorization: 'Bearer d7f9d7c4-80e7-4fcc-9a43-11f10d645948'
			},
			body: JSON.stringify({
				prompt: prompt,
				modelId: 'ef9ef89f-74b4-4114-a072-42823f91beba',
				width: 512,
				height: 512,
				promptMagic: true,
				public: false,
				sd_version: 'v2'
			})
		};

		const generationResponse = await fetch(
			'https://cloud.leonardo.ai/api/rest/v1/generations',
			postOptions
		);
		const generationData = await generationResponse.json();
		const generationId = generationData.sdGenerationJob.generationId;

		console.log(generationId);

		// Get the image data
		const getImageOptions = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				authorization: 'Bearer d7f9d7c4-80e7-4fcc-9a43-11f10d645948'
			}
		};

		const imageResponse = await fetch(
			`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
			getImageOptions
		);
		const imageData = await imageResponse.json();
		const imageUrl = imageData.url; // Assuming the URL is provided in the response

		return { success: true, generationId, prompt, imageUrl };
	}
} satisfies Actions;

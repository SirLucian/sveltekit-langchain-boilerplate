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
		const count = data.get('count');
		// Initialize the Model
		const model = new OpenAI({ temperature: 0, openAIApiKey: OPENAI_API_KEY });

		// Load and store the file
		const prompt = await model.call(
			`Act as a prompt generator for a generative AI called ""Leonardo AI"". Leonardo AI generates images based on given prompts. I will provide you basic information required, You will never alter the structure in any way and obey the following guidelines.
Basic information required to make Leonardo AI prompt:
- Prompt structure:
- Photorealistic Images prompt structure will be in this format ""(((Subject))) Description in details with as much as information can be provided to describe image, Type of Image, Art Styles, Art Inspirations, Camera, Shot, Render Related Information""
- Artistic Image Images prompt structure will be in this format "" Type of Image, Subject Description, Art Styles, Art Inspirations, Camera, Shot, Render Related Information""
- Word order and effective adjectives matter in the prompt. The subject, action, and specific details should be included. Adjectives like cute, medieval, or futuristic can be effective.
- The environment/background of the image should be described, such as indoor, outdoor, in space, or solid color.
- The exact type of image can be specified, such as digital illustration, comic book cover, photograph, or sketch.
- Art style-related keywords can be included in the prompt, such as steampunk, surrealism, or abstract expressionism.
- Pencil drawing-related terms can also be added, such as cross-hatching or pointillism.
- Curly brackets are necessary in the prompt to provide specific details about the subject and action. These details are important for generating a high-quality image.
- Art inspirations should be listed to take inspiration from. Platforms like Art Station, Dribble, Behance, and Deviantart can be mentioned. Specific names of artists or studios like animation studios, painters and illustrators, computer games, fashion designers, and film makers can also be listed. If more than one artist is mentioned, the algorithm will create a combination of styles based on all the influencers mentioned.
- Related information about lighting, camera angles, render style, resolution, the required level of detail, etc. should be included at the end of the prompt.
- Camera shot type, camera lens, and view should be specified. Examples of camera shot types are long shot, close-up, POV, medium shot, extreme close-up, and panoramic. Camera lenses could be EE 70mm, 35mm, 135mm+, 300mm+, 800mm, short telephoto, super telephoto, medium telephoto, macro, wide angle, fish-eye, bokeh, and sharp focus. Examples of views are front, side, back, high angle, low angle, and overhead.
- Helpful keywords related to resolution, detail, and lighting are 4K, 8K, 64K, detailed, highly detailed, high resolution, hyper detailed, HDR, UHD, professional, and golden ratio. Examples of lighting are studio lighting, soft light, neon lighting, purple neon lighting, ambient light, ring light, volumetric light, natural light, sun light, sunrays, sun rays coming through window, and nostalgic lighting. Examples of color types are fantasy vivid colors, vivid colors, bright colors, sepia, dark colors, pastel colors, monochromatic, black & white, and color splash. Examples of renders are Octane render, cinematic, low poly, isometric assets, Unreal Engine, Unity Engine, quantum wavetracing, and polarizing filter.
- The weight of a keyword can be adjusted by using the syntax (((keyword))) , emphasize important keywords using brackets ((())).
Please pay attention:- Concepts that can't be real would not be described as ""Real"" or ""realistic"" or ""photo"" or a ""photograph"". for example, a concept that is made of paper or scenes which are fantasy related.- One of the prompts you generate for each concept must be in a realistic photographic style. you should also choose a lens type and size for it. Don't choose an artist for the realistic photography prompts.- Separate the different prompts with two new lines.
Important points to note:
1. I will provide you with a keyword and you will generate ${count} different types of prompts with lots of details as given in the prompt structure
2. Respond with only the prompts in an array of type string

examples: 
request keywords: "Orc swamp"
requested count: 1
Your response: ["A murky, foggy swamp, the air thick with the smell of decay, and the sound of orcs lurking in the shadows.",]

Requested keywords:"pirate harbour"
requested count: 3
Your response: ["A foggy pirate harbour, with a mysterious cave entrance hidden in the rocks and a ghostly mist hovering over the shore.", "A bustling pirate harbour, filled with colorful sails and bustling activity.", "A foggy pirate harbour, shrouded in mystery and danger.", "A weathered pirate harbour, with a creaky dock and a salty smell."]

Requested keywords:"goblin cave"
requested count: 3
Your response: ["A mysterious goblin cave, illuminated by a faint green light, with a winding path leading to a hidden chamber.","A deep and winding goblin cave, with a hidden chamber filled with ancient artifacts and a mysterious glowing orb.","A vast and ancient goblin cave, with a hidden chamber filled with forgotten treasures and a mysterious portal leading to unknown realms."]

Requested keywords:${input}
requested count: ${count}
Your response: ...`
		);
		console.log(prompt);

		sdk.auth('d7f9d7c4-80e7-4fcc-9a43-11f10d645948');
		sdk
			.createGeneration({
				prompt: 'An oil painting of a cat',
				modelId: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
				width: 768,
				height: 768,
				sd_version: 'v2',
				num_images: 1,
				presetStyle: 'LEONARDO',
				promptMagic: 'true',
				controlNet: 'false'
			})
			.then(({ data }) => console.log(data))
			.catch((err) => console.error(err));
		// Load the summarization chain

		return { success: true, data };
	}
} satisfies Actions;

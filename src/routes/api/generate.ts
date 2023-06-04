import type { RequestHandler } from '@sveltejs/kit';
import { Leonardo } from '@leonardo-ai/sdk';
import { CreateGenerationResponse } from '@leonardo-ai/sdk/dist/sdk/models/operations';
import {
	ControlnetTypeEnum,
	SdGenerationSchedulersEnum,
	SdGenerationStyleEnum,
	SdVersionsEnum
} from '@leonardo-ai/sdk/dist/sdk/models/shared';
import { LEO_API_KEY } from '$env/static/private';

const sdk = new Leonardo({
	security: {
		bearerAuth: `Bearer ${LEO_API_KEY}`
	}
});

export const post: RequestHandler = async (request) => {
	try {
		// Get the input data from the request body
		const { keyword, tone } = request.body;

		// Create the generation
		const generationResponse: CreateGenerationResponse = await sdk.generation.createGeneration({
			prompt: keyword,
			modelId: 'ef9ef89f-74b4-4114-a072-42823f91beba',
			width: 512,
			height: 512,
			promptMagic: true,
			public: false,
			sd_version: SdVersionsEnum.V2,
			sd_generation_style: SdGenerationStyleEnum.BLENDED,
			sd_generation_scheduler: SdGenerationSchedulersEnum.DEFAULT,
			sd_controlnet_type: ControlnetTypeEnum.AUTO,
			sd_max_variation: 1,
			sd_min_variation: 0.5,
			sd_max_color_difference: 50
		});

		// Check if the generation was successful
		if (generationResponse.statusCode === 200) {
			const generationId = generationResponse.data.sdGenerationJob.generationId;

			// Retrieve the image URL
			const imageUrl = await sdk.generation.getGenerationImageURL(generationId);

			// Return the image URL as a response
			return {
				body: {
					imageUrl
				}
			};
		} else {
			// Handle the case when the generation fails
			return {
				status: 500,
				body: {
					error: 'Generation failed'
				}
			};
		}
	} catch (error) {
		console.error('Error creating generation:', error);

		// Return an error response
		return {
			status: 500,
			body: {
				error: 'Error creating generation'
			}
		};
	}
};

import { GoogleGenAI, Modality } from "@google/genai";
import { EnhancementSettings, MimeType } from '../types';

const buildPrompt = (settings: EnhancementSettings): string => {
  if (settings.sciFiMode) {
    return `Transform this photo into a 'Blade Runner 2049' style. Apply a cyberpunk aesthetic with a color palette dominated by neon purples, electric blues, and vibrant oranges. Add subtle effects like holographic glows, light rain reflections on surfaces, and a slightly gritty, cinematic texture. Ensure the key subjects of the photo remain clear and prominent within this new style.`;
  }

  let prompt = `You are an expert photo restoration AI. Enhance this image by improving its resolution, clarity, and sharpness. Adjust the lighting and contrast to be more natural and vibrant. If there are any scratches, dust, or damage, meticulously remove them. Pay special attention to restoring fine details in faces, making them clear and recognizable without looking artificial. The desired level of enhancement is ${settings.enhancementLevel.toLowerCase()}. Do not change the original composition.`;

  if (settings.colorize) {
    prompt += " This is a black and white photo; please colorize it realistically, choosing colors appropriate for the era and subject matter.";
  }

  prompt += ` Apply a noise reduction level of ${settings.noiseReduction} out of 100, balancing noise removal with preserving image detail.`;

  return prompt;
};

export const enhanceImage = async (
  base64ImageData: string,
  mimeType: MimeType,
  settings: EnhancementSettings
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = buildPrompt(settings);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const firstPart = response.candidates?.[0]?.content?.parts?.[0];

  if (firstPart && 'inlineData' in firstPart && firstPart.inlineData) {
    return firstPart.inlineData.data;
  }

  throw new Error("No image was generated. The model might not have returned an image.");
};

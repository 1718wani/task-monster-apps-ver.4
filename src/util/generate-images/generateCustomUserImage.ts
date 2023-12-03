import { Computerender } from "computerender";

export const generateCustomUserImage = async (sex: string) => {
  const promptStrings: string = sex;
  const cr = new Computerender(process.env.COM_RENDER_KEY);
  const params = {
    // prompt: promptStrings,
    // seed: randomInt(1, 5001),
    prompt: "man",
    seed: 100,
  };

  try {
    const imageResult: Buffer = await cr.generateImage(params);
    return imageResult;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};

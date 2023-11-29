import axios from "axios";
import { Computerender } from "computerender";
import { randomInt } from "crypto";

const promptsCollection = [
  "white background,Hyperrealistic,Unreal Engine, 8K, Ultra-High Definition, highest quality, High quality texture,realistic photo,full body,white background, mythical beast",
  "white background,Hyperrealistic,Unreal Engine, 8K, Ultra-High Definition, highest quality, High quality texture,realistic photo,full body, unknown creature, cool,red",
  "white background,Hyperrealistic,Unreal Engine, 8K, Ultra-High Definition, highest quality, High quality texture,realistic photo,full body, dragon,yellow",
  "white background,Hyperrealistic,Unreal Engine, 8K, Ultra-High Definition, highest quality, High quality texture,realistic photo,full body, unknown creature, cool,purple,medusa",
  "white background,Hyperrealistic,Unreal Engine, 8K, Ultra-High Definition, highest quality, High quality texture,realistic photo,full body, unknown creature, cool,vampire",
]

export async function generateImage() :Promise<Buffer>{
  const getRandomElementFromArray= (elements: string[]):string => {
    const randomIndex = Math.floor(Math.random() * elements.length);
    return elements[randomIndex] as string;
  }
  const randomInt = Math.floor(Math.random() * (30000 - 0 + 1)) + 1;
  const cr = new Computerender(process.env.COM_RENDER_KEY);
  const params = {
    prompt:
      "white background,Hyperrealistic,Unreal Engine, 8K, Ultra-High Definition, highest quality, High quality texture,realistic photo,full body,white background, mythical beast",
      // getRandomElementFromArray(promptsCollection),
    seed: 7777,
    // seed: randomInt,
  };

  try {
    const imageResult = await cr.generateImage(params);
    console.log(imageResult, "resultよ");
    return imageResult;
  } catch (error) {
    console.error("Error generating image:", error);
    // エラーレスポンスを送信
    throw error
  }
}

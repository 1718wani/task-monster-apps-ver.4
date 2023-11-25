import { supabase } from "~/lib/supabaseClient";

export const uploadAlImageBlobToSupabase = async (
  generateMethod: Promise<Buffer>,
  folderName: string
) => {
  const imageBuffer = await generateMethod;
  const randomEightDegitNum = Math.random().toString(32).substring(2);
  const filePath = `${folderName}/${randomEightDegitNum}.png`;
  const my_bucket = "monster-todo-bucket";
  if (!imageBuffer) {
    console.error("画像生成に失敗しました");
  }

  const { error } = await supabase.storage
    .from(my_bucket)
    .upload(filePath, imageBuffer, {
      contentType: "image/png",
    });
  if (error) {
    console.error("アップロードエラー", error.message);
    throw error;
  }

  // 画像のURLを取得
  const { data } = supabase.storage.from(my_bucket).getPublicUrl(filePath);
  const imageUrl = data.publicUrl;
  return imageUrl
};


import { supabase } from "../lib/supabase";

const BUCKET_NAME = "duisburg-media";

export async function uploadImage(file, folder = "projects") {
  if (!file) {
    throw new Error("Please select an image.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG and WebP images are allowed.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must not exceed 5MB.");
  }

  const fileExtension = file.name.split(".").pop().toLowerCase();

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return {
    url: publicUrlData.publicUrl,
    path: data.path,
  };
}

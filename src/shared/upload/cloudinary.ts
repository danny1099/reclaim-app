"use server";
import { v2 as cloudinary } from "cloudinary";
import { env } from "@/config/env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

export const uploadImage = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const unit8Array = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "reclaim" }, (error, result) => {
        if (result) {
          const { secure_url } = result;
          return resolve(secure_url);
        }
        reject(error);
      })
      .end(unit8Array);
  });
};

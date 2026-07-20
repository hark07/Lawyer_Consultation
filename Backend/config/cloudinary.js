import { v2 as cloudinary } from "cloudinary";

console.log("Cloud Name:", process.env.CLOUDINARY_NAME);

console.log("API Key:", process.env.CLOUDINARY_API_KEY);

console.log(
  "Secret:",
  process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing",
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,

  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("✅ Cloudinary Connected");

export default cloudinary;

import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageOnCloudinary = async (imagePath) => {
    try {
        if(!imagePath){
            throw new Error('Image path is required');
        }

        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'Amzei-App',
            resource_type: 'image',
        });

         // ✅ Safe delete: only if file exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

        return result; 
    } catch (error) {
         // ✅ Safe delete even on error
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error('Image upload failed');
    }
}

export { uploadImageOnCloudinary };